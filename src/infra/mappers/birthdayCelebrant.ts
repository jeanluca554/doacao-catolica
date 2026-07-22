import { BirthdayCelebrant } from "~/domain/entities/birthdayCelebrant";
import type { ExternalBirthdayCelebrant } from "../schemas/external/birthdayCelebrant";

class BirthdayCelebrantMapper {
  static toEntity(props: ExternalBirthdayCelebrant) {
    return BirthdayCelebrant.restore({
      id: props.id,
      name: props.name,
      email: props.email,
      phone: props.phone,
      whatsapp: props.whatsapp,
      birthdate: props.birth_date,
    });
  }
}

export { BirthdayCelebrantMapper };
