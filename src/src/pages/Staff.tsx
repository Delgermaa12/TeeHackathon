import React, { useMemo, useState } from "react";
import StaffTabs from "../components/StaffTabs";
import StaffCard from "../components/StaffCard";
import { staffData } from "../data/StaffData";
import { useAppContext } from "../context/AppContext";
import { translations } from "../translations";

type StaffTab = "all" | "udirdlaga" | "bagsh";

const Staff: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StaffTab>("all");
  const { language, theme } = useAppContext();

  const t = translations[language].staff;

  const filteredStaff = useMemo(() => {
    if (activeTab === "all") return staffData;
    return staffData.filter((item) => item.type === activeTab);
  }, [activeTab]);

  // const textMain = theme === "dark" ? "text-white" : "text-black";
  const panelClass =
    theme === "dark"
      ? "bg-white/[0.03] border-white/10"
      : "bg-black/[0.03] border-black/10";

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* <div className="text-center mb-10">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 ${textMain}`}>
            {t.title}
          </h1>
        </div> */}

        <div className="mb-12">
          <StaffTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((person) => (
            <StaffCard key={person.id} person={person} />
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div
            className={`mt-10 rounded-3xl border p-8 text-center ${panelClass}`}
          >
            <p
              className={
                theme === "dark" ? "text-white/50 mt-2" : "text-black/50 mt-2"
              }
            >
              {t.emptyDesc}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Staff;