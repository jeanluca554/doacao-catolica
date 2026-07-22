import { RichTextarea } from "~/client/components/campaignSettings/richTextarea";
import { SectionCard } from "~/client/components/campaignSettings/sectionCard";
import { FormField } from "~/client/components/ui/form-field";
import { ImageUpload } from "~/client/components/ui/image-upload";
import { Input } from "~/client/components/ui/input";

function WhyDonateSection() {
  return (
    <SectionCard
      title="Por que doar"
      description="Bloco que explica o propósito da campanha."
    >
      <FormField name="whyDonateTitle" label="Título">
        <Input
          name="whyDonateTitle"
          placeholder="Ex.: Por que sua doação importa"
        />
      </FormField>
      <FormField name="whyDonateText" label="Texto">
        <RichTextarea
          name="whyDonateText"
          placeholder="Explique o impacto da doação..."
        />
      </FormField>
      <FormField name="whyDonateImage" label="Imagem do bloco">
        <ImageUpload name="whyDonateImage" width={800} height={600} />
        <p className="text-xs text-muted-foreground">Dimensão recomendada: 800x600px.</p>
      </FormField>
    </SectionCard>
  );
}

export { WhyDonateSection };
