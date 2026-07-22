import { formatDate } from "@arkyn/shared";

const NOT_INFORMED = "Não informado";
const INVALID_DATE = "Data inválida";

type BirthdayCelebrantProps = {
  id: string;
  name: string;
  email: string | null;
  birthdate: string | null;
  phone: string | null;
  whatsapp: string | null;
};

class BirthdayCelebrant {
  readonly id: string;
  readonly name: string;
  readonly email: string | null;
  readonly birthdate: string | null;
  readonly phone: string | null;
  readonly whatsapp: string | null;

  private constructor(props: BirthdayCelebrantProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.birthdate = props.birthdate;
    this.phone = props.phone;
    this.whatsapp = props.whatsapp;
  }

  static restore(props: BirthdayCelebrantProps) {
    return new BirthdayCelebrant(props);
  }

  private formatBirthdate() {
    if (!this.birthdate) return INVALID_DATE;

    const [date, rawTime] = this.birthdate.split("T");
    if (!date || !rawTime) return INVALID_DATE;

    const time = rawTime.split(".")[0];
    if (!time) return INVALID_DATE;

    try {
      return formatDate([date, time], "timestamp", "DD/MM/YYYY");
    } catch {
      return INVALID_DATE;
    }
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email || NOT_INFORMED,
      birthdate: this.formatBirthdate(),
      phone: this.phone || NOT_INFORMED,
      whatsapp: this.whatsapp || NOT_INFORMED,
    };
  }
}

export { BirthdayCelebrant };
export type { BirthdayCelebrantProps };
