import { z } from "zod";

const externalCampaignGroupSchema = z
  .object({
    id: z.string().uuid().optional(),
    uuid: z.string().uuid().optional(),
    public_id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string(),
    created_at: z.string().optional(),
    created_at2: z.string().optional(),
    createdAt: z.string().optional(),
  })
  .refine((group) => !!(group.id ?? group.uuid ?? group.public_id), {
    message: "Campaign group id is required",
  })
  .refine(
    (group) => !!(group.created_at ?? group.created_at2 ?? group.createdAt),
    { message: "Campaign group created date is required" },
  );

const externalCampaignGroupsDataSchema = z.array(
  externalCampaignGroupSchema,
);

const externalCampaignGroupsSchema = z
  .union([
    z
      .object({
        data: z.object({
          data: externalCampaignGroupsDataSchema,
          total: z.number(),
          current_page: z.number(),
          last_page: z.number(),
        }),
      })
      .transform((response) => ({
        data: response.data.data,
        meta: {
          currentPage: response.data.current_page,
          totalItems: response.data.total,
          totalPages: response.data.last_page,
        },
      })),
    z
      .object({
        data: externalCampaignGroupsDataSchema,
        meta: z.object({
          currentPage: z.number(),
          totalItems: z.number(),
          totalPages: z.number(),
        }),
      })
      .transform((response) => response),
    z
      .object({
        data: externalCampaignGroupsDataSchema,
        meta: z.object({
          current_page: z.number(),
          total_items: z.number(),
          total_pages: z.number(),
        }),
      })
      .transform((response) => ({
        data: response.data,
        meta: {
          currentPage: response.meta.current_page,
          totalItems: response.meta.total_items,
          totalPages: response.meta.total_pages,
        },
      })),
  ])
  .transform((response) => response);

type ExternalCampaignGroup = z.infer<typeof externalCampaignGroupSchema>;

export {
  externalCampaignGroupsSchema,
  type ExternalCampaignGroup,
};
