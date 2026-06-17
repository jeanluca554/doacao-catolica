import { formatToCpf, formatDate } from "@arkyn/shared";

type ContactDetailConstructorProps = {
  contactId: string;
  name: string;
  cpf: string | null;
  accountId: number;
  birthDate: string | null;
  phone: string | null;
  email: string | null;
  avatar: string | null;
};

type ContactDetailRestoreProps = ContactDetailConstructorProps;

class ContactDetail {
  contactId: string;
  name: string;
  cpf: string | null;
  accountId: number;
  birthDate: string | null;
  phone: string | null;
  email: string | null;
  avatar: string | null;

  private constructor(props: ContactDetailConstructorProps) {
    this.contactId = props.contactId;
    this.name = props.name;
    this.cpf = props.cpf;
    this.accountId = props.accountId;
    this.birthDate = props.birthDate;
    this.phone = props.phone;
    this.email = props.email;
    this.avatar = props.avatar;
  }

  static restore(props: ContactDetailRestoreProps): ContactDetail {
    return new ContactDetail(props);
  }

  toJson() {
    return {
      contactId: this.contactId,
      name: this.name,
      cpf: this.cpf ? formatToCpf(this.cpf) : null,
      accountId: this.accountId,
      birthDate: this.birthDate
        ? formatDate([this.birthDate.split("T")[0]], "timestamp", "DD/MM/YYYY")
        : null,
      phone: this.phone && this.phone.length >= 5 ? this.phone : null,
      email: this.email,
      avatar: this.avatar,
    };
  }
}

export { ContactDetail };
