type WorkspaceConstructorProps = {
  id: string;
  name: string;
  status: "active" | "inactive";
  image: string;
  userId: string;
  description: string;
};

type WorkspaceRestoreProps = WorkspaceConstructorProps;

class Workspace {
  id: string;
  name: string;
  status: "active" | "inactive";
  image: string;
  userId: string;
  description: string;

  private constructor(props: WorkspaceConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.status = props.status;
    this.image = props.image;
    this.userId = props.userId;
    this.description = props.description;
  }

  static restore(props: WorkspaceRestoreProps): Workspace {
    return new Workspace({
      id: props.id,
      name: props.name,
      status: props.status,
      image: props.image,
      userId: props.userId,
      description: props.description,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      image: this.image,
      userId: this.userId,
      description: this.description,
    };
  }
}

export { Workspace };
