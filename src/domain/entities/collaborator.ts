type CollaboratorConstructorProps = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  specialtyId: string | null;
  specialtyName: string | null;
  active: boolean;
  avatar: string | null;
  professionalRegistry: string | null;
};

type CollaboratorRestoreProps = CollaboratorConstructorProps;

class Collaborator {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  specialtyId: string | null;
  specialtyName: string | null;
  active: boolean;
  avatar: string | null;
  professionalRegistry: string | null;

  private constructor(props: CollaboratorConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.roleId = props.roleId;
    this.specialtyId = props.specialtyId;
    this.active = props.active;
    this.roleName = props.roleName;
    this.specialtyName = props.specialtyName;
    this.avatar = props.avatar;
    this.professionalRegistry = props.professionalRegistry;
  }

  static restore(props: CollaboratorRestoreProps): Collaborator {
    return new Collaborator({
      id: props.id,
      name: props.name,
      email: props.email,
      roleId: props.roleId,
      specialtyId: props.specialtyId,
      active: props.active,
      roleName: props.roleName,
      specialtyName: props.specialtyName,
      avatar: props.avatar,
      professionalRegistry: props.professionalRegistry,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      roleId: this.roleId,
      specialtyId: this.specialtyId,
      active: this.active,
      roleName: this.roleName,
      specialtyName: this.specialtyName,
      avatar: this.avatar,
      professionalRegistry: this.professionalRegistry,
    };
  }
}

export { Collaborator };
