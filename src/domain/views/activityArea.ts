type activityAreaConstructorProps = {
  id: string;
  name: string;
};

type activityAreaRestoreProps = activityAreaConstructorProps;

class ActivityArea {
  id: string;
  name: string;

  private constructor(props: activityAreaConstructorProps) {
    this.id = props.id;
    this.name = props.name;
  }

  static restore(props: activityAreaRestoreProps): ActivityArea {
    return new ActivityArea({
      id: props.id,
      name: props.name,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export { ActivityArea };
