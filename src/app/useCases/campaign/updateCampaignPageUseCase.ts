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
