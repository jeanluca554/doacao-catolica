import { Image, Loader2, Upload } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { cn } from "~/client/lib/utils";
import { FormErrorContext, FormFieldContext } from "./form-field";

type ImageUploadProps = {
  name: string;
  defaultValue?: string | null;
  width?: number;
  height?: number;
  reduceQuality?: number;
  disabled?: boolean;
};

function ImageUpload({
  name,
  defaultValue,
  width,
  height,
  reduceQuality,
  disabled = false,
}: ImageUploadProps) {
  const fieldName = use(FormFieldContext);
  const fieldErrors = use(FormErrorContext);
  const hasFieldError = !!fieldErrors[fieldName]?.length;

  const [value, setValue] = useState(defaultValue ?? "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValue || null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  async function handleFile(file: File) {
    if (disabled || isLoading) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const localUrl = URL.createObjectURL(file);
    objectUrlRef.current = localUrl;

    const previousValue = value;
    const previousPreviewUrl = previewUrl;

    setPreviewUrl(localUrl);
    setIsLoading(true);
    setUploadError(null);

    try {
      const params = new URLSearchParams();
      if (width) params.set("w", String(width));
      if (height) params.set("h", String(height));
      if (reduceQuality) params.set("reduceQuality", String(reduceQuality));

      const queryString = params.toString();
      const uploadUrl = `/api/file-upload${queryString ? `?${queryString}` : ""}`;

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(uploadUrl, { method: "POST", body: formData });
      const data = await response.json();

      if (!response.ok || !data?.url) throw new Error("Upload falhou");

      setValue(data.url);
      setPreviewUrl(data.url);
      URL.revokeObjectURL(localUrl);
      objectUrlRef.current = null;
    } catch {
      URL.revokeObjectURL(localUrl);
      objectUrlRef.current = null;
      setValue(previousValue);
      setPreviewUrl(previousPreviewUrl);
      setUploadError("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function handleDragOver(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    if (disabled || isLoading) return;
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  }

  const hasError = hasFieldError || !!uploadError;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <input type="hidden" name={name} value={value} />

      <label
        aria-invalid={hasFieldError || undefined}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted transition-colors",
          !disabled && !isLoading && "hover:bg-muted/70",
          (disabled || isLoading) && "cursor-not-allowed opacity-70",
          hasError && "border-destructive",
          "group-data-invalid:border-destructive",
        )}
      >
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={disabled || isLoading}
          onChange={handleInputChange}
        />

        {isLoading && (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={24} className="animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Enviando...</span>
          </div>
        )}

        {!isLoading && !previewUrl && (
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <Image size={24} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Clique para enviar ou arraste aqui
            </span>
            <div className="pointer-events-none flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5">
              <Upload size={14} className="text-foreground" />
              <span className="text-xs font-semibold text-foreground">Selecionar</span>
            </div>
          </div>
        )}

        {!isLoading && previewUrl && (
          <>
            <img
              src={previewUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/40 py-3">
              <div className="pointer-events-none flex items-center gap-1.5 rounded-md border border-white/30 bg-white/20 px-3 py-1.5 backdrop-blur-sm">
                <Upload size={14} className="text-white" />
                <span className="text-xs font-semibold text-white">Alterar imagem</span>
              </div>
            </div>
          </>
        )}
      </label>

      {uploadError && (
        <p className="text-xs font-medium text-destructive">{uploadError}</p>
      )}
    </div>
  );
}

export { ImageUpload };
export type { ImageUploadProps };
