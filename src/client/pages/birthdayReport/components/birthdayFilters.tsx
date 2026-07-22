import { CalendarDays } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Label } from "~/client/components/ui/label";
import { Select } from "~/client/components/ui/select";

const CURRENT_MONTH_OPTION = "0";
const ALL_DAYS_OPTION = "all";

const MONTH_OPTIONS = [
  { label: "Mês atual", value: CURRENT_MONTH_OPTION },
  { label: "Janeiro", value: "1" },
  { label: "Fevereiro", value: "2" },
  { label: "Março", value: "3" },
  { label: "Abril", value: "4" },
  { label: "Maio", value: "5" },
  { label: "Junho", value: "6" },
  { label: "Julho", value: "7" },
  { label: "Agosto", value: "8" },
  { label: "Setembro", value: "9" },
  { label: "Outubro", value: "10" },
  { label: "Novembro", value: "11" },
  { label: "Dezembro", value: "12" },
];

const DAY_OPTIONS = Array.from({ length: 31 }, (_, index) =>
  String(index + 1),
);

function BirthdayFilters() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1);
  const currentDay = String(currentDate.getDate());
  const selectedMonth = params.get("filter[month]");
  const selectedDay = params.get("filter[day]") ?? ALL_DAYS_OPTION;

  useEffect(() => {
    if (selectedMonth) return;

    const nextParams = new URLSearchParams(location.search);
    nextParams.set("filter[month]", currentMonth);
    navigate(`?${nextParams.toString()}`, { replace: true });
  }, [currentMonth, location.search, navigate, selectedMonth]);

  function updateFilter(name: string, value?: string) {
    const nextParams = new URLSearchParams(location.search);

    if (value) nextParams.set(name, value);
    else nextParams.delete(name);

    navigate(`?${nextParams.toString()}`);
  }

  function handleMonthChange(value: string) {
    updateFilter(
      "filter[month]",
      value === CURRENT_MONTH_OPTION ? currentMonth : value,
    );
  }

  function handleDayChange(value: string) {
    updateFilter(
      "filter[day]",
      value === ALL_DAYS_OPTION ? undefined : value,
    );
  }

  return (
    <div className="flex items-end gap-4 max-md:flex-col max-md:items-stretch">
      <div className="flex min-w-52 flex-col gap-1.5">
        <Label htmlFor="birthday-month">Mês</Label>
        <Select.Root
          value={selectedMonth ?? CURRENT_MONTH_OPTION}
          onValueChange={handleMonthChange}
        >
          <Select.Trigger id="birthday-month">
            <CalendarDays size={16} className="text-muted-foreground" />
            <Select.Value />
          </Select.Trigger>
          <Select.Content position="popper" align="start">
            {MONTH_OPTIONS.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      <div className="flex min-w-52 flex-col gap-1.5">
        <Label htmlFor="birthday-day">Dia</Label>
        <Select.Root value={selectedDay} onValueChange={handleDayChange}>
          <Select.Trigger id="birthday-day">
            <Select.Value />
          </Select.Trigger>
          <Select.Content position="popper" align="start">
            <Select.Item value={currentDay}>
              Dia atual ({currentDay})
            </Select.Item>
            <Select.Item value={ALL_DAYS_OPTION}>Todos os dias</Select.Item>
            {DAY_OPTIONS.filter((day) => day !== currentDay).map((day) => (
              <Select.Item key={`day-${day}`} value={day}>
                {day}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  );
}

export { BirthdayFilters };
