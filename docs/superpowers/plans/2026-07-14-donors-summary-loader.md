# Donors Summary Loader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar o loader da rota `route.campaign.donors.tsx` que busca o resumo de doadores via `/donors/summary/{campaignId}` e retorna `{ summary }` para a `DonorsPage`.

**Architecture:** O `DonorGateway` existente é estendido com `getDonorsSummary`. Um novo UseCase e Controller são criados, conectados via Factory ao loader. O Controller não verifica `AuthService` — o loader da rota já faz o redirect para `/sign-in`.

**Tech Stack:** React Router v7 (SSR), TypeScript, Zod, `donationApi` (autenticado via `api-key` no header).

## Global Constraints

- Usar named imports do React, nunca `import * as React`
- `donationApi` autentica via header `{ "api-key": environmentVariables.API_KEY_DONATION }` — nunca via token de usuário
- Sem passos de commit — o usuário revisa e commita manualmente via IDE
- Sem arquivos de documentação ou README extras

---

## Mapa de arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `src/infra/schemas/external/donorsSummary.ts` | Criar | Schema Zod para validar o response de `/donors/summary` |
| `src/domain/gateways/donor.ts` | Modificar | Adicionar tipo `DonorsSummary` e método `getDonorsSummary` à interface |
| `src/infra/gateways/donor.ts` | Modificar | Implementar `getDonorsSummary` via `donationApi.get` |
| `src/app/useCases/getDonorsSummary/getDonorsSummaryUseCase.ts` | Criar | Recebe `campaignId`, delega ao gateway, retorna `DonorsSummary` |
| `src/infra/controllers/getDonorsSummary/getDonorsSummaryController.ts` | Criar | Extrai `campaignId` de `route.params`, chama UseCase |
| `src/main/factories/getDonorsSummary/getDonorsSummaryFactory.ts` | Criar | Instancia `DonorGateway → UseCase → Controller` |
| `src/main/routes/route.campaign.donors.tsx` | Modificar | Loader chama factory e retorna `{ summary }` |

---

### Task 1: Schema externo + contratos de domínio

**Files:**
- Create: `src/infra/schemas/external/donorsSummary.ts`
- Modify: `src/domain/gateways/donor.ts`

**Interfaces:**
- Produces:
  - `donorsSummaryResponseSchema` — Zod schema exportado
  - `DonorsSummary` — tipo do domínio exportado
  - `DonorGatewayDTO` atualizado com `getDonorsSummary(campaignId: string): Promise<DonorsSummary>`

---

- [ ] **Step 1: Criar o schema externo Zod**

Criar `src/infra/schemas/external/donorsSummary.ts`:

```ts
import { z } from "zod";

const donorsSummaryResponseSchema = z.object({
  data: z.object({
    total_donors: z.number(),
    recurring_donors: z.number(),
    one_time_donors: z.number(),
    new_donors_this_month: z.number(),
    new_donors_previous_month: z.number(),
    new_donors_variation_percentage: z.number(),
    total_recurring_amount: z.number(),
    average_donation_amount: z.number(),
  }),
});

export { donorsSummaryResponseSchema };
```

---

- [ ] **Step 2: Adicionar `DonorsSummary` e `getDonorsSummary` ao gateway de domínio**

Em `src/domain/gateways/donor.ts`, adicionar o tipo `DonorsSummary` antes de `DonorGatewayDTO` e o método na interface. O arquivo atual termina com:

```ts
type DonorGatewayDTO = {
  createDonor(input: CreateDonorInput): Promise<string>;
  listDonors(
    projectId: string,
    accountId: number,
    searchParams: DonorSearchParams,
    token: string,
  ): Promise<SearchResult<Donor>>;
};

export type { DonorGatewayDTO, CreateDonorInput };
```

Substituir por:

```ts
type DonorsSummary = {
  totalDonors: number;
  recurringDonors: number;
  oneTimeDonors: number;
  newDonorsThisMonth: number;
  newDonorsPreviousMonth: number;
  newDonorsVariationPercentage: number;
  totalRecurringAmount: number;
  averageDonationAmount: number;
};

type DonorGatewayDTO = {
  createDonor(input: CreateDonorInput): Promise<string>;
  listDonors(
    projectId: string,
    accountId: number,
    searchParams: DonorSearchParams,
    token: string,
  ): Promise<SearchResult<Donor>>;
  getDonorsSummary(campaignId: string): Promise<DonorsSummary>;
};

export type { DonorGatewayDTO, CreateDonorInput, DonorsSummary };
```

---

### Task 2: Implementação no gateway de infraestrutura

**Files:**
- Modify: `src/infra/gateways/donor.ts`

**Interfaces:**
- Consumes: `DonorsSummary` de `~/domain/gateways/donor` (Task 1), `donorsSummaryResponseSchema` de `~/infra/schemas/external/donorsSummary` (Task 1)
- Produces: `DonorGateway.getDonorsSummary(campaignId: string): Promise<DonorsSummary>` implementado

---

- [ ] **Step 3: Adicionar imports necessários ao gateway de infra**

Em `src/infra/gateways/donor.ts`, substituir o bloco completo de imports pelo bloco abaixo (adiciona `DonorsSummary`, `environmentVariables`, `donationApi` e `donorsSummaryResponseSchema` aos imports existentes):

```ts
import type { DonorSearchParams } from "~/app/search/donorSearchParams";
import { SearchResult } from "~/app/shared/searchResult";
import { Donor } from "~/domain/entities/donor";
import type { CreateDonorInput, DonorGatewayDTO, DonorsSummary } from "~/domain/gateways/donor";
import { environmentVariables } from "~/main/config/environmentVariables";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { donationApi } from "../http/donationApi";
import { createDonorResponseSchema } from "../schemas/external/createDonor";
import { externalDonorsListSchema } from "../schemas/external/donor";
import { donorsSummaryResponseSchema } from "../schemas/external/donorsSummary";
```

---

- [ ] **Step 4: Implementar o método `getDonorsSummary` na classe**

Em `src/infra/gateways/donor.ts`, adicionar o método `getDonorsSummary` dentro da classe `DonorGateway`, após o método `listDonors`:

```ts
async getDonorsSummary(campaignId: string): Promise<DonorsSummary> {
  const url = `/donors/summary/${campaignId}`;

  const apiResponse = await donationApi.get(url, {
    headers: { "api-key": environmentVariables.API_KEY_DONATION },
  });

  if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

  const schemaValidator = new SchemaValidatorAdapter(donorsSummaryResponseSchema);
  const data = schemaValidator.validate(apiResponse.response);

  return {
    totalDonors: data.data.total_donors,
    recurringDonors: data.data.recurring_donors,
    oneTimeDonors: data.data.one_time_donors,
    newDonorsThisMonth: data.data.new_donors_this_month,
    newDonorsPreviousMonth: data.data.new_donors_previous_month,
    newDonorsVariationPercentage: data.data.new_donors_variation_percentage,
    totalRecurringAmount: data.data.total_recurring_amount,
    averageDonationAmount: data.data.average_donation_amount,
  };
}
```

---

### Task 3: UseCase

**Files:**
- Create: `src/app/useCases/getDonorsSummary/getDonorsSummaryUseCase.ts`

**Interfaces:**
- Consumes: `DonorGatewayDTO`, `DonorsSummary` de `~/domain/gateways/donor` (Task 1)
- Produces: `class GetDonorsSummaryUseCase` com `execute(campaignId: string): Promise<DonorsSummary>`

---

- [ ] **Step 5: Criar o UseCase**

Criar `src/app/useCases/getDonorsSummary/getDonorsSummaryUseCase.ts`:

```ts
import type { DonorGatewayDTO, DonorsSummary } from "~/domain/gateways/donor";

class GetDonorsSummaryUseCase {
  constructor(private donorGateway: DonorGatewayDTO) {}

  async execute(campaignId: string): Promise<DonorsSummary> {
    return await this.donorGateway.getDonorsSummary(campaignId);
  }
}

export { GetDonorsSummaryUseCase };
```

---

### Task 4: Controller + Factory + wiring no loader

**Files:**
- Create: `src/infra/controllers/getDonorsSummary/getDonorsSummaryController.ts`
- Create: `src/main/factories/getDonorsSummary/getDonorsSummaryFactory.ts`
- Modify: `src/main/routes/route.campaign.donors.tsx`

**Interfaces:**
- Consumes: `GetDonorsSummaryUseCase` (Task 3), `DonorsSummary` (Task 1)
- Produces:
  - `getDonorsSummaryFactory.handle(route)` → `Promise<DonorsSummary>`
  - loader retorna `{ summary: DonorsSummary }`

---

- [ ] **Step 6: Criar o Controller**

Criar `src/infra/controllers/getDonorsSummary/getDonorsSummaryController.ts`:

```ts
import type { GetDonorsSummaryUseCase } from "~/app/useCases/getDonorsSummary/getDonorsSummaryUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { DonorsSummary } from "~/domain/gateways/donor";
import type { RouteDTO } from "~/main/types/route";

class GetDonorsSummaryController {
  constructor(private getDonorsSummaryUseCase: GetDonorsSummaryUseCase) {}

  async handle(route: RouteDTO): Promise<DonorsSummary> {
    const { campaignId } = route.params;
    if (!campaignId) throw HttpAdapter.badRequest("campaignId is required");

    return await this.getDonorsSummaryUseCase.execute(campaignId);
  }
}

export { GetDonorsSummaryController };
```

---

- [ ] **Step 7: Criar a Factory**

Criar `src/main/factories/getDonorsSummary/getDonorsSummaryFactory.ts`:

```ts
import { GetDonorsSummaryUseCase } from "~/app/useCases/getDonorsSummary/getDonorsSummaryUseCase";
import { GetDonorsSummaryController } from "~/infra/controllers/getDonorsSummary/getDonorsSummaryController";
import { DonorGateway } from "~/infra/gateways/donor";

const donorGateway = new DonorGateway();
const getDonorsSummaryUseCase = new GetDonorsSummaryUseCase(donorGateway);
const getDonorsSummaryController = new GetDonorsSummaryController(getDonorsSummaryUseCase);

const getDonorsSummary = {
  handle: getDonorsSummaryController.handle.bind(getDonorsSummaryController),
};

export { getDonorsSummary };
```

---

- [ ] **Step 8: Atualizar o loader em `route.campaign.donors.tsx`**

Em `src/main/routes/route.campaign.donors.tsx`, adicionar o import da factory:

```ts
import { getDonorsSummary } from "../factories/getDonorsSummary/getDonorsSummaryFactory";
```

Substituir o loader atual:

```ts
export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);

  const user = await AuthService.getAuthStorage(adaptedRoute);
  if (!user) throw redirect("/sign-in");

  return {};
}
```

Por:

```ts
export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);

  const user = await AuthService.getAuthStorage(adaptedRoute);
  if (!user) throw redirect("/sign-in");

  const summary = await getDonorsSummary.handle(adaptedRoute);

  return { summary };
}
```
