type MedicationConstructorProps = {
  id: string;
  followUpId: string;
  active: boolean;
  name: string;
  dosage: string;
  startDate: string;
  endDate?: string | null;
  reminderEnabled: boolean;
  dosagePeriod: string;
};

type MedicationRestoreProps = MedicationConstructorProps;

class Medication {
  id: string;
  followUpId: string;
  active: boolean;
  name: string;
  dosage: string;
  startDate: string;
  endDate?: string | null;
  reminderEnabled: boolean;
  dosagePeriod: string;

  private constructor(props: MedicationConstructorProps) {
    this.id = props.id;
    this.followUpId = props.followUpId;
    this.active = props.active;
    this.name = props.name;
    this.dosage = props.dosage;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.reminderEnabled = props.reminderEnabled;
    this.dosagePeriod = props.dosagePeriod;
  }

  static restore(props: MedicationRestoreProps): Medication {
    return new Medication(props);
  }

  toJson() {
    return {
      id: this.id,
      followUpId: this.followUpId,
      active: this.active,
      name: this.name,
      dosage: this.dosage,
      startDate: this.startDate,
      endDate: this.endDate,
      reminderEnabled: this.reminderEnabled,
      dosagePeriod: this.dosagePeriod,
    };
  }
}

export { Medication };
