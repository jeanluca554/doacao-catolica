type InviteConstructorProps = {
  id: string;
  organizationId: string;
  email: string;
  roleId: string;
  roleName?: string | null;
  name: string | null;
  avatar: string | null;
  professionalRegistry: string | null;
  activityAreaId: string | null;
  activityAreaName?: string | null;
  specialtyId: string | null;
  specialtyName?: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  responded: string | null;
  respondedAt: string | null;
};

type InviteRestoreProps = InviteConstructorProps;

class Invite {
  id: string;
  organizationId: string;
  email: string;
  roleId: string;
  roleName?: string | null;
  name: string | null;
  avatar: string | null;
  professionalRegistry: string | null;
  activityAreaId: string | null;
  activityAreaName?: string | null;
  specialtyId: string | null;
  specialtyName?: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  responded: string | null;
  respondedAt: string | null;

  private constructor(props: InviteConstructorProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this.email = props.email;
    this.roleId = props.roleId;
    this.roleName = props.roleName || null;
    this.name = props.name;
    this.avatar = props.avatar;
    this.professionalRegistry = props.professionalRegistry;
    this.activityAreaId = props.activityAreaId;
    this.activityAreaName = props.activityAreaName;
    this.specialtyId = props.specialtyId;
    this.specialtyName = props.specialtyName;
    this.status = props.status;
    this.responded = props.responded;
    this.respondedAt = props.respondedAt;
  }

  static restore(props: InviteRestoreProps): Invite {
    return new Invite({
      id: props.id,
      activityAreaId: props.activityAreaId,
      activityAreaName: props.activityAreaName,
      avatar: props.avatar,
      email: props.email,
      name: props.name,
      organizationId: props.organizationId,
      professionalRegistry: props.professionalRegistry,
      roleId: props.roleId,
      roleName: props.roleName,
      specialtyId: props.specialtyId,
      specialtyName: props.specialtyName,
      status: props.status,
      responded: props.responded,
      respondedAt: props.respondedAt,
    });
  }

  toJson() {
    return {
      id: this.id,
      activityAreaId: this.activityAreaId,
      activityAreaName: this.activityAreaName,
      avatar: this.avatar,
      email: this.email,
      name: this.name,
      organizationId: this.organizationId,
      professionalRegistry: this.professionalRegistry,
      roleId: this.roleId,
      roleName: this.roleName || null,
      specialtyId: this.specialtyId,
      specialtyName: this.specialtyName,
      status: this.status,
      responded: this.responded,
      respondedAt: this.respondedAt,
    };
  }
}

export { Invite };
