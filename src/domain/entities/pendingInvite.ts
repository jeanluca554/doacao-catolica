type PendingInviteProps = {
  id: string;
  projectName: string;
  inviterName: string;
  inviteDate: string;
  projectImage: string | null;
  invitedUserRoleId: string;
  publicProjectId: string;
};

class PendingInvite {
  readonly id: string;
  readonly projectName: string;
  readonly inviterName: string;
  readonly inviteDate: string;
  readonly projectImage: string | null;
  readonly invitedUserRoleId: string;
  readonly publicProjectId: string;

  private constructor(props: PendingInviteProps) {
    this.id = props.id;
    this.projectName = props.projectName;
    this.inviterName = props.inviterName;
    this.inviteDate = props.inviteDate;
    this.projectImage = props.projectImage;
    this.invitedUserRoleId = props.invitedUserRoleId;
    this.publicProjectId = props.publicProjectId;
  }

  static restore(props: PendingInviteProps) {
    return new PendingInvite(props);
  }

  toJson() {
    return {
      id: this.id,
      projectName: this.projectName,
      inviterName: this.inviterName,
      inviteDate: this.inviteDate,
      projectImage: this.projectImage,
      invitedUserRoleId: this.invitedUserRoleId,
      publicProjectId: this.publicProjectId,
    };
  }
}

export { PendingInvite };
export type { PendingInviteProps };
