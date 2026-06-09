type RoleConstructorProps = {
  id: string;
  name: string;
  description: string;
};

type RoleRestoreProps = RoleConstructorProps;

class Role {
  id: string;
  name: string;
  description: string;

  private constructor(props: RoleConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
  }

  static restore(props: RoleRestoreProps): Role {
    return new Role({
      id: props.id,
      name: props.name,
      description: props.description,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}

export { Role };
