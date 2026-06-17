type ContactDetailConstructorProps = {
  contactId: string;
  name: string;
  cpf: string | null;
  accountId: number;
  birthDate: string | null;
  phone: string | null;
  email: string | null;
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

  private constructor(props: ContactDetailConstructorProps) {
    this.contactId = props.contactId;
    this.name = props.name;
    this.cpf = props.cpf;
    this.accountId = props.accountId;
    this.birthDate = props.birthDate;
    this.phone = props.phone;
    this.email = props.email;
  }

  static restore(props: ContactDetailRestoreProps): ContactDetail {
    return new ContactDetail(props);
  }

  toJson() {
    return {
      contactId: this.contactId,
      name: this.name,
      cpf: this.cpf,
      accountId: this.accountId,
      birthDate: this.birthDate,
      phone: this.phone,
      email: this.email,
    };
  }
}

export { ContactDetail };
