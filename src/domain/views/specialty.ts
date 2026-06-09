type SpecialtyConstructorProps = {
  id: string;
  name: string;
  activityAreaId: string;
};

type SpecialtyRestoreProps = SpecialtyConstructorProps;

class Specialty {
  id: string;
  name: string;
  activityAreaId: string;

  private constructor(props: SpecialtyConstructorProps) {
    this.id = props.id;
    this.name = props.name;
    this.activityAreaId = props.activityAreaId;
  }

  static restore(props: SpecialtyRestoreProps): Specialty {
    return new Specialty({
      id: props.id,
      name: props.name,
      activityAreaId: props.activityAreaId,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      activityAreaId: this.activityAreaId,
    };
  }
}

export { Specialty };
