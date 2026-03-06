import React from "react";
import { useAppContext } from "../context/AppContext";
import { translations } from "../translations";

type StaffTab = "all" | "udirdlaga" | "bagsh";

interface StaffTabsProps {
  activeTab: StaffTab;
  onChange: (tab: StaffTab) => void;
}

const StaffTabs: React.FC<StaffTabsProps> = ({ activeTab, onChange }) => {
  const { language, theme } = useAppContext();
  const t = translations[language].staff;

  const tabs: { key: StaffTab; label: string }[] = [
    { key: "all", label: t.all },
    { key: "udirdlaga", label: t.management },
    { key: "bagsh", label: t.teachers },
  ];

  const passiveClass =
    theme === "dark"
      ? "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
      : "bg-[#e8edf5] text-black/60 border-[#d4dbe6] hover:bg-[#dde4ee] hover:text-black";

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide border transition-all duration-300 ${
              isActive
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg"
                : passiveClass
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default StaffTabs;