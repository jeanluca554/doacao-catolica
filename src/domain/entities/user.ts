type UserConstructorProps = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type UserRestoreProps = UserConstructorProps;

class User {
  id: string;
  name: string;
  email: string;
  avatar: string;

  private constructor(props: UserConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.avatar = props.avatar;
  }

  static restore(props: UserRestoreProps): User {
    return new User({
      id: props.id,
      name: props.name,
      email: props.email,
      avatar: props.avatar,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
    };
  }
}

export { User };
