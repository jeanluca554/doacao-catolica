import { use, useState } from "react";
import CurrencyInputPrimitive from "react-currency-input-field";
import { FormFieldContext } from "~/client/components/ui/form-field";
import { InputGroup } from "~/client/components/ui/input-group";
import { cn } from "~/lib/utils";

type CurrencyInputProps = {
  name?: string;
  id?: string;
  defaultValue?: number;
  placeholder?: string;
  min?: number;
  disabled?: boolean;
  className?: string;
};

function CurrencyInput({
  name,
  id,
  defaultValue,
  placeholder = "0,00",
  min,
  disabled,
  className,
}: CurrencyInputProps) {
  const fieldName = use(FormFieldContext);
  const resolvedName = name ?? (fieldName || undefined);
  const resolvedId = id ?? (fieldName || undefined);

  const [numericValue, setNumericValue] = useState(
    defaultValue?.toString() ?? "",
  );

  return (
    <InputGroup.Root>
      <InputGroup.Addon>
        <InputGroup.Text>R$</InputGroup.Text>
      </InputGroup.Addon>
      <input type="hidden" name={resolvedName} value={numericValue} />
      <CurrencyInputPrimitive
        id={resolvedId}
        intlConfig={{ locale: "pt-BR" }}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        onValueChange={(_, __, values) =>
          setNumericValue(values?.value ?? "")
        }
        className={cn(
          "w-full min-h-11 rounded-md border border-border bg-input text-sm",
          "pl-10 pr-3 py-2 text-foreground",
          "placeholder:text-muted-foreground",
          "outline-none ring-offset-background",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    </InputGroup.Root>
  );
}

export { CurrencyInput };
