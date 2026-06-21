import { useEffect, useState } from "react";
import { motion as Motion } from "motion/react";
import {
  ViewChart,
  Dropdown,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../components/ui";

// chart view dropdown options free to customize it...
const chartViewOptions = [
  {
    label: "آمار بازدید روزانه",
    value: 1,
  },
  {
    label: "آمار بازدید هفتگی",
    value: 7,
  },
  {
    label: "آمار بازدید ماهانه",
    value: 30,
  },
];

function SiteViews() {
  const [days, setDays] = useState({
    dayCount: chartViewOptions[1].value,
    statistics: chartViewOptions[1].label,
  });
  const [isOpen, setIsOpen] = useState(false);

  function handleSetDays(label, value) {
    setDays({
      dayCount: Number(value),
      statistics: label,
    });

    localStorage.viewChartSettings = JSON.stringify({ value, label });
  }

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.viewChartSettings);
      if (saved?.value && saved?.label) {
        setDays({
          dayCount: Number(saved.value),
          statistics: saved.label,
        });
      }
    } catch (error) {
      console.log("Failed to load chart settings", error.message);
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <header className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <h3 className="text-foreground text-lg font-medium">
              <Motion.span
                key={days.statistics}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {days.statistics}
              </Motion.span>
            </h3>
            <Dropdown
              mode={"single"}
              triggerText={"نمایش بر اساس"}
              triggerOnClick={() => setIsOpen(!isOpen)}
              options={chartViewOptions}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              activeCond={days.dayCount}
              menuItemOnClick={(label, value) => {
                handleSetDays(label, value);
                setIsOpen(false);
              }}
            />
          </header>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ViewChart
          key={days.dayCount}
          value={days.dayCount}
          className={"h-96"}
        />
      </CardContent>
    </Card>
  );
}
export default SiteViews;
