type PatientConstructorProps = {
  id: string;
  organizationId: string;
  name: string;
  avatar: string | null;
  document: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  phone: string;
  whatsapp: string;
  email: string;
  street: string;
  streetNumber: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  observations?: string | null;
};

type PatientRestoreProps = PatientConstructorProps;

class Patient {
  id: string;
  organizationId: string;
  name: string;
  avatar: string | null;
  document: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  phone: string;
  whatsapp: string;
  email: string;
  street: string;
  streetNumber: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  observations?: string | null;

  private constructor(props: PatientConstructorProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this.name = props.name;
    this.avatar = props.avatar;
    this.document = props.document;
    this.birthDate = props.birthDate;
    this.gender = props.gender;
    this.maritalStatus = props.maritalStatus;
    this.phone = props.phone;
    this.whatsapp = props.whatsapp;
    this.email = props.email;
    this.street = props.street;
    this.streetNumber = props.streetNumber;
    this.complement = props.complement;
    this.neighborhood = props.neighborhood;
    this.city = props.city;
    this.state = props.state;
    this.country = props.country;
    this.postalCode = props.postalCode;
    this.observations = props.observations;
  }

  static restore(props: PatientRestoreProps): Patient {
    return new Patient(props);
  }

  toJson() {
    return {
      id: this.id,
      organizationId: this.organizationId,
      name: this.name,
      avatar: this.avatar,
      document: this.document,
      birthDate: this.birthDate,
      gender: this.gender,
      maritalStatus: this.maritalStatus,
      phone: this.phone,
      whatsapp: this.whatsapp,
      email: this.email,
      street: this.street,
      streetNumber: this.streetNumber,
      complement: this.complement,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      country: this.country,
      postalCode: this.postalCode,
      observations: this.observations,
    };
  }
}

export { Patient };
