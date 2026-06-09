import { Medication } from "~/domain/entities/medication";
import type { ExternalMedication } from "../schemas/external/medication";
import { formatDate } from "@arkyn/shared";

const medicationDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatMedicationDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return medicationDateFormatter.format(parsedDate);
}

function formatMedicationDateRange(startDate: string, endDate?: string | null) {
  const formattedStartDate = formatMedicationDate(startDate);
  const formattedEndDate = endDate ? ` - ${formatMedicationDate(endDate)}` : "";

  if (formattedStartDate === formattedEndDate) return formattedStartDate;

  return `${formattedStartDate}${formattedEndDate}`;
}

class MedicationMapper {
  static toEntity(externalMedication: ExternalMedication) {
    return Medication.restore({
      id: externalMedication.id,
      followUpId: externalMedication.followUpId,
      active: externalMedication.active,
      name: externalMedication.name,
      dosage: externalMedication.dosage,
      startDate:
        externalMedication.startDate &&
        formatDate(
          [externalMedication.startDate.slice(0, 10)],
          "timestamp",
          "YYYY-MM-DD",
        ),
      endDate:
        externalMedication.endDate &&
        formatDate(
          [externalMedication.endDate.slice(0, 10)],
          "timestamp",
          "YYYY-MM-DD",
        ),
      reminderEnabled: externalMedication.remindersEnabled,
      dosagePeriod: formatMedicationDateRange(
        externalMedication.startDate,
        externalMedication.endDate,
      ),
    });
  }
}

export { MedicationMapper };
