# Campaign Page Action Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar o case `updateCampaignPage` na action da rota `route.campaign.campaignPage.tsx`, permitindo salvar as configurações de conteúdo público da campanha.

**Architecture:** O form submete 14 campos de página ao endpoint `/project/update/{id}` via `api.put`. Como esse endpoint exige campos que não estão no form (`name`, `slug`, `status`, etc.), o use case busca a campanha atual antes do PUT para preservá-los — padrão idêntico ao `updateCampaignGeneralInfo`. Segue a stack completa: schema → domain type → infra gateway → use case → controller → factory → route.

**Tech Stack:** React Router v7 (SSR), Zod v4, clean architecture em camadas (`domain` → `app` → `infra` → `main`).

## Global Constraints

- Validações e transforms de tipo pertencem ao schema (`infra/schemas/internal/`), nunca ao controller.
- O controller recebe dados já tipados e os repassa diretamente ao use case (sem transformações extras).
- Nunca usar `z.string().uuid()` — usar `z.uuid()` standalone (Zod v4).
- Factory exporta um objeto `{ handle: controller.handle.bind(controller) }`.
- O `default` do switch da action deve retornar `HttpAdapter.badRequest("Ação não definida")`.
- Named imports do React; nunca `import * as React`.
- Arquivos, componentes e identificadores sempre em inglês.

---

### Task 1: Domain contracts — schema interno + tipo no gateway

**Files:**
- Modify: `src/infra/schemas/internal/campaign.ts`
- Modify: `src/domain/gateways/campaign.ts`

**Interfaces:**
- Produz: `updateCampaignPageSchema` (exportado de `~/infra/schemas/internal/campaign`) e `UpdateCampaignPageInput` / `CampaignGatewayDTO` atualizado (exportados de `~/domain/gateways/campaign`).

- [ ] **Step 1: Adicionar `updateCampaignPageSchema` em `src/infra/schemas/internal/campaign.ts`**

Abra o arquivo e adicione ao final, antes do bloco `export`:

```ts
const updateCampaignPageSchema = z.object({
  title: z.string().optional().transform((v) => v || null),
  description: z.string().optional().transform((v) => v || null),
  image: z.string().optional().transform((v) => v || null),
  imageMobile: z.string().optional().transform((v) => v || null),
  videoUrl: z.string().optional().transform((v) => v || null),
  headerImage: z.string().optional().transform((v) => v || null),
  whyDonateTitle: z.string().optional().transform((v) => v || null),
  whyDonateText: z.string().optional().transform((v) => v || null),
  whyDonateImage: z.string().optional().transform((v) => v || null),
  aboutUsTitle: z.string().optional().transform((v) => v || null),
  aboutUsText: z.string().optional().transform((v) => v || null),
  aboutUsImage: z.string().optional().transform((v) => v || null),
  supportWhatsapp: z.string().optional().transform((v) => v || null),
  supportEmail: z.string().optional().transform((v) => v || null),
});

type UpdateCampaignPageType = z.infer<typeof updateCampaignPageSchema>;
```

Adicione `updateCampaignPageSchema` e `UpdateCampaignPageType` ao bloco `export {}` já existente no arquivo.

- [ ] **Step 2: Adicionar `UpdateCampaignPageInput` e método `updateCampaignPage` em `src/domain/gateways/campaign.ts`**

Adicione o tipo antes do tipo `CampaignGatewayDTO`:

```ts
type UpdateCampaignPageInput = {
  campaignId: string;
  subAccountId: string;
  name: string;
  slug: string;
  status: boolean;
  published: boolean;
  startDate: string | null;
  endDate: string | null;
  noEndDate: boolean;
  phone: string | null;
  typeDonation: string;
  totalGoal: number | null;
  monthlyGoal: number | null;
  institutionName: string | null;
  cnpj: string | null;
  address: string | null;
  email: string | null;
  type: number;
  title: string | null;
  description: string | null;
  image: string | null;
  imageMobile: string | null;
  videoUrl: string | null;
  headerImage: string | null;
  whyDonateTitle: string | null;
  whyDonateText: string | null;
  whyDonateImage: string | null;
  aboutUsTitle: string | null;
  aboutUsText: string | null;
  aboutUsImage: string | null;
  supportWhatsapp: string | null;
  supportEmail: string | null;
};
```

Adicione o método ao `CampaignGatewayDTO`:

```ts
updateCampaignPage: (
  input: UpdateCampaignPageInput,
  token: string,
) => Promise<void>;
```

Adicione `UpdateCampaignPageInput` ao bloco `export type {}` já existente.

---

### Task 2: Infra gateway — implementar `updateCampaignPage`

**Files:**
- Modify: `src/infra/gateways/campaign.ts`

**Interfaces:**
- Consome: `UpdateCampaignPageInput` de `~/domain/gateways/campaign`; `api` de `~/infra/http/api`; `HttpAdapter` de `~/infra/adapters/httpAdapter`.
- Produz: método `updateCampaignPage` em `CampaignGateway`, satisfazendo a interface `CampaignGatewayDTO`.

- [ ] **Step 1: Implementar `updateCampaignPage` em `CampaignGateway`**

Abra `src/infra/gateways/campaign.ts`. O import de `UpdateCampaignPageInput` já virá automaticamente via `CampaignGatewayDTO` — adicione-o explicitamente ao import de `~/domain/gateways/campaign` se necessário. Adicione o método à classe `CampaignGateway`:

```ts
async updateCampaignPage(
  input: UpdateCampaignPageInput,
  token: string,
): Promise<void> {
  const body = {
    name: input.name,
    slug: input.slug,
    status: input.status,
    published: input.published,
    start_date: input.startDate,
    end_date: input.endDate,
    no_end_date: input.noEndDate,
    phone: input.phone,
    type_donation: input.typeDonation,
    total_goal: input.totalGoal,
    monthly_goal: input.monthlyGoal,
    institution_name: input.institutionName,
    cnpj: input.cnpj,
    address: input.address,
    subaccount_id: input.subAccountId,
    email: input.email,
    type: input.type,
    title: input.title,
    description: input.description,
    image: input.image,
    image_mobile: input.imageMobile,
    featured_video: input.videoUrl,
    featured_image: input.headerImage,
    why_donate_title: input.whyDonateTitle,
    why_donate_text: input.whyDonateText,
    why_donate_image: input.whyDonateImage,
    about_us_title: input.aboutUsTitle,
    about_us_text: input.aboutUsText,
    about_us_image: input.aboutUsImage,
    support_whatsapp: input.supportWhatsapp,
    support_email: input.supportEmail,
  };

  const apiResponse = await api.put(`/project/update/${input.campaignId}`, {
    body,
    token,
  });

  if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
}
```

Certifique-se de adicionar `UpdateCampaignPageInput` ao import de `~/domain/gateways/campaign` no topo do arquivo (junto com `UpdateCampaignGeneralInfoInput`).

---

### Task 3: Use case + controller + factory

**Files:**
- Create: `src/app/useCases/campaign/updateCampaignPageUseCase.ts`
- Create: `src/infra/controllers/campaign/updateCampaignPageController.ts`
- Create: `src/main/factories/campaign/updateCampaignPageFactory.ts`

**Interfaces:**
- Consome: `CampaignGatewayDTO` de `~/domain/gateways/campaign`; `updateCampaignPageSchema` de `~/infra/schemas/internal/campaign`; `AuthService`, `DecodeRequestBodyAdapter`, `HttpAdapter`, `SchemaValidatorAdapter` (mesmos do `updateCampaignGeneralInfoController`); `RouteDTO` de `~/main/types/route`.
- Produz: `updateCampaignPage` (exportado de `~/main/factories/campaign/updateCampaignPageFactory`) com `{ handle }`.

- [ ] **Step 1: Criar `src/app/useCases/campaign/updateCampaignPageUseCase.ts`**

```ts
import type { CampaignGatewayDTO } from "~/domain/gateways/campaign";

type InputProps = {
  campaignId: string;
  token: string;
  title: string | null;
  description: string | null;
  image: string | null;
  imageMobile: string | null;
  videoUrl: string | null;
  headerImage: string | null;
  whyDonateTitle: string | null;
  whyDonateText: string | null;
  whyDonateImage: string | null;
  aboutUsTitle: string | null;
  aboutUsText: string | null;
  aboutUsImage: string | null;
  supportWhatsapp: string | null;
  supportEmail: string | null;
};

class UpdateCampaignPageUseCase {
  constructor(private campaignGateway: CampaignGatewayDTO) {}

  async execute(input: InputProps) {
    const { campaignId, token } = input;

    const campaign = await this.campaignGateway.getCampaign(campaignId, token);

    await this.campaignGateway.updateCampaignPage(
      {
        campaignId,
        subAccountId: campaign.subAccountId,
        name: campaign.name,
        slug: campaign.slug,
        status: campaign.status,
        published: campaign.published,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        noEndDate: campaign.noEndDate,
        phone: campaign.phone,
        typeDonation: campaign.typeDonation,
        totalGoal: campaign.totalGoal ? parseFloat(campaign.totalGoal) : null,
        monthlyGoal: campaign.monthlyGoal
          ? parseFloat(campaign.monthlyGoal)
          : null,
        institutionName: campaign.institutionName,
        cnpj: campaign.cnpj,
        address: campaign.address,
        email: campaign.email,
        type: campaign.type,
        title: input.title,
        description: input.description,
        image: input.image,
        imageMobile: input.imageMobile,
        videoUrl: input.videoUrl,
        headerImage: input.headerImage,
        whyDonateTitle: input.whyDonateTitle,
        whyDonateText: input.whyDonateText,
        whyDonateImage: input.whyDonateImage,
        aboutUsTitle: input.aboutUsTitle,
        aboutUsText: input.aboutUsText,
        aboutUsImage: input.aboutUsImage,
        supportWhatsapp: input.supportWhatsapp,
        supportEmail: input.supportEmail,
      },
      token,
    );

    return {
      toast: {
        message: "Campanha atualizada com sucesso!",
        type: "success" as const,
      },
    };
  }
}

export { UpdateCampaignPageUseCase };
```

- [ ] **Step 2: Criar `src/infra/controllers/campaign/updateCampaignPageController.ts`**

```ts
import type { UpdateCampaignPageUseCase } from "~/app/useCases/campaign/updateCampaignPageUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { updateCampaignPageSchema } from "~/infra/schemas/internal/campaign";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class UpdateCampaignPageController {
  constructor(
    private updateCampaignPageUseCase: UpdateCampaignPageUseCase,
  ) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const { campaignId } = route.params;
    if (!campaignId) throw HttpAdapter.badRequest("campaignId is required");

    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const validated = new SchemaValidatorAdapter(
      updateCampaignPageSchema,
    ).validate(body);

    return await this.updateCampaignPageUseCase.execute({
      campaignId,
      token: user.token,
      ...validated,
    });
  }
}

export { UpdateCampaignPageController };
```

- [ ] **Step 3: Criar `src/main/factories/campaign/updateCampaignPageFactory.ts`**

```ts
import { UpdateCampaignPageUseCase } from "~/app/useCases/campaign/updateCampaignPageUseCase";
import { UpdateCampaignPageController } from "~/infra/controllers/campaign/updateCampaignPageController";
import { CampaignGateway } from "~/infra/gateways/campaign";

const campaignGateway = new CampaignGateway();
const updateCampaignPageUseCase = new UpdateCampaignPageUseCase(campaignGateway);
const updateCampaignPageController = new UpdateCampaignPageController(
  updateCampaignPageUseCase,
);

const updateCampaignPage = {
  handle: updateCampaignPageController.handle.bind(updateCampaignPageController),
};

export { updateCampaignPage };
```

---

### Task 4: Wiring da rota + verificação

**Files:**
- Modify: `src/main/routes/route.campaign.campaignPage.tsx`

**Interfaces:**
- Consome: `updateCampaignPage` de `~/main/factories/campaign/updateCampaignPageFactory`; `HttpAdapter` de `~/infra/adapters/httpAdapter`.

- [ ] **Step 1: Adicionar import da factory e do HttpAdapter em `route.campaign.campaignPage.tsx`**

Adicione ao topo do arquivo (junto com os imports existentes):

```ts
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { updateCampaignPage } from "../factories/campaign/updateCampaignPageFactory";
```

- [ ] **Step 2: Atualizar o switch da action**

Substitua o bloco `switch` atual:

```ts
switch (_action) {
  case "updateCampaignPage":
    return await updateCampaignPage.handle(route);
  default:
    return HttpAdapter.badRequest("Ação não definida");
}
```

- [ ] **Step 3: Verificar no browser**

Com o dev server rodando:
1. Acesse uma campanha → Configurações → Página da Campanha.
2. Preencha pelo menos o campo "Título" em "Conteúdo da página" e clique em "Salvar alterações".
3. Esperado: toast de sucesso "Campanha atualizada com sucesso!".
4. Recarregue a página — o campo salvo deve permanecer.
5. Verifique no Network tab que o POST foi para `/campaign/:id/settings/campaign-page` e a resposta contém `{ toast: { type: "success" } }`.
