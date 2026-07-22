# Design: Action da Tela "Página da Campanha"

**Data:** 2026-07-22
**Rota:** `route.campaign.campaignPage.tsx`
**Ação disparada:** `_action = "updateCampaignPage"`

---

## Contexto

A tela "Página da Campanha" (`/campaign/:campaignId/settings/campaign-page`) tem um formulário com 5 seções que configura o conteúdo público da campanha. A action correspondente estava com `switch` vazio (`default: return null`). O objetivo é implementar o case `updateCampaignPage` seguindo exatamente o padrão de `updateCampaignGeneralInfo`.

---

## Mapeamento de campos

| Campo no form | Campo enviado à API (`/project/update/{id}`) |
|---|---|
| `title` | `title` |
| `description` | `description` |
| `image` | `image` |
| `imageMobile` | `image_mobile` |
| `videoUrl` | `featured_video` |
| `headerImage` | `featured_image` |
| `whyDonateTitle` | `why_donate_title` |
| `whyDonateText` | `why_donate_text` |
| `whyDonateImage` | `why_donate_image` |
| `aboutUsTitle` | `about_us_title` |
| `aboutUsText` | `about_us_text` |
| `aboutUsImage` | `about_us_image` |
| `supportWhatsapp` | `support_whatsapp` |
| `supportEmail` | `support_email` |

Campos obrigatórios pela API mas ausentes no form (`name`, `slug`, `status`, `published`, `typeDonation`, `subAccountId`, `email`, `type`, `phone`, `address`, `totalGoal`, `monthlyGoal`, `cnpj`, `institutionName`, `startDate`, `endDate`, `noEndDate`) são preservados buscando a campanha atual via `getCampaign` antes do PUT — padrão idêntico ao de `updateCampaignGeneralInfo`.

---

## Arquitetura

Segue a mesma stack de camadas do `updateCampaignGeneralInfo`:

```
Route action
  └─ updateCampaignPageFactory
       └─ UpdateCampaignPageController
            └─ UpdateCampaignPageUseCase
                 └─ CampaignGateway.getCampaign()
                 └─ CampaignGateway.updateCampaignPage()
                      └─ api.put("/project/update/:id")
```

---

## Arquivos a criar/modificar

| # | Arquivo | Ação |
|---|---|---|
| 1 | `src/infra/schemas/internal/campaign.ts` | Adicionar `updateCampaignPageSchema` |
| 2 | `src/domain/gateways/campaign.ts` | Adicionar `UpdateCampaignPageInput` e `updateCampaignPage` ao DTO |
| 3 | `src/infra/gateways/campaign.ts` | Implementar `updateCampaignPage` |
| 4 | `src/app/useCases/campaign/updateCampaignPageUseCase.ts` | Criar use case |
| 5 | `src/infra/controllers/campaign/updateCampaignPageController.ts` | Criar controller |
| 6 | `src/main/factories/campaign/updateCampaignPageFactory.ts` | Criar factory |
| 7 | `src/main/routes/route.campaign.campaignPage.tsx` | Adicionar `case "updateCampaignPage"` |

---

## Schema interno (validação do form)

Todos os campos são opcionais (nenhum campo da "Página da Campanha" é obrigatório no formulário). Strings vazias são transformadas em `null` para evitar enviar strings vazias à API.

```ts
const updateCampaignPageSchema = z.object({
  title: z.string().optional().transform(v => v || null),
  description: z.string().optional().transform(v => v || null),
  image: z.string().optional().transform(v => v || null),
  imageMobile: z.string().optional().transform(v => v || null),
  videoUrl: z.string().optional().transform(v => v || null),
  headerImage: z.string().optional().transform(v => v || null),
  whyDonateTitle: z.string().optional().transform(v => v || null),
  whyDonateText: z.string().optional().transform(v => v || null),
  whyDonateImage: z.string().optional().transform(v => v || null),
  aboutUsTitle: z.string().optional().transform(v => v || null),
  aboutUsText: z.string().optional().transform(v => v || null),
  aboutUsImage: z.string().optional().transform(v => v || null),
  supportWhatsapp: z.string().optional().transform(v => v || null),
  supportEmail: z.string().optional().transform(v => v || null),
});
```

---

## Use Case

1. `getCampaign(campaignId, token)` — busca campanha atual
2. `updateCampaignPage({ campaignId, ...campanha_atual, ...form_fields }, token)` — PUT na API
3. Retorna `{ toast: { message: "Campanha atualizada com sucesso!", type: "success" } }`

---

## Decisões

- **Todos os campos são opcionais** no schema interno: a página permite salvar sem preencher todas as seções.
- **Get-before-update**: necessário porque a API exige campos (`name`, `slug`, `status`, etc.) que não estão no form da "Página da Campanha".
- **Sem novo endpoint**: a action usa o mesmo `/project/update/{id}` que o `updateCampaignGeneralInfo`, apenas com campos diferentes.
