type ProjectRoleProps = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

class ProjectRole {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;

  private constructor(props: ProjectRoleProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static restore(props: ProjectRoleProps): ProjectRole {
    return new ProjectRole(props);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

export { ProjectRole };
export type { ProjectRoleProps };
