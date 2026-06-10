type UserConstructorProps = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  token: string;
  accountId: number;
  provider: "facebook" | "google" | "password";
};

type UserRestoreProps = UserConstructorProps;

class User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  token: string;
  accountId: number;
  provider: "facebook" | "google" | "password";

  private constructor(props: UserConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.avatar = props.avatar;
    this.token = props.token;
    this.accountId = props.accountId;
    this.provider = props.provider;
  }

  static restore(props: UserRestoreProps): User {
    return new User({
      id: props.id,
      name: props.name,
      email: props.email,
      avatar: props.avatar,
      token: props.token,
      accountId: props.accountId,
      provider: props.provider,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      token: this.token,
      accountId: this.accountId,
      provider: this.provider,
    };
  }
}

export { User };
