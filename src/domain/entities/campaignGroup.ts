type CampaignGroupProps = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

class CampaignGroup {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly createdAt: string;

  private constructor(props: CampaignGroupProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.createdAt = props.createdAt;
  }

  static restore(props: CampaignGroupProps): CampaignGroup {
    return new CampaignGroup(props);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
    };
  }
}

export { CampaignGroup };
export type { CampaignGroupProps };
