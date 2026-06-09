import { Patient } from "~/domain/entities/patient";
import type { ExternalPatient } from "../schemas/external/patient";

class PatientMapper {
  static toEntity(externalPatient: ExternalPatient) {
    return Patient.restore({
      id: externalPatient.id,
      organizationId: externalPatient.organizationId,
      name: externalPatient.name,
      avatar: externalPatient.avatar,
      document: externalPatient.document,
      birthDate: externalPatient.birthDate,
      gender: externalPatient.gender.toLowerCase(),
      maritalStatus: externalPatient.maritalStatus.toLowerCase(),
      phone: externalPatient.phone,
      whatsapp: externalPatient.whatsapp,
      email: externalPatient.email,
      street: externalPatient.street,
      streetNumber: externalPatient.streetNumber,
      complement: externalPatient.complement,
      neighborhood: externalPatient.neighborhood,
      city: externalPatient.city,
      state: externalPatient.state,
      country: externalPatient.country,
      postalCode: externalPatient.postalCode,
      observations: externalPatient.observations,
    });
  }
}

export { PatientMapper };
