type CollaboratorUser = {
  name: string;
  email: string;
};

type CollaboratorProps = {
  id: string;
  projectId: string;
  userId: number;
  value: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  user: CollaboratorUser;
};

class Collaborator {
  readonly id: string;
  readonly projectId: string;
  readonly userId: number;
  readonly value: string;
  readonly roleId: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly user: CollaboratorUser;

  private constructor(props: CollaboratorProps) {
    this.id = props.id;
    this.projectId = props.projectId;
    this.userId = props.userId;
    this.value = props.value;
    this.roleId = props.roleId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.user = props.user;
  }

  static restore(props: CollaboratorProps): Collaborator {
    return new Collaborator(props);
  }

  toJson() {
    return {
      id: this.id,
      projectId: this.projectId,
      userId: this.userId,
      value: this.value,
      roleId: this.roleId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      user: this.user,
    };
  }
}

export { Collaborator };
export type { CollaboratorProps, CollaboratorUser };
