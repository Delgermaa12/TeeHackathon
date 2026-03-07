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
      ? "border-white/10 bg-white/[0.03]"
      : "border-black/10 bg-black/[0.03]";

  const innerMaskClass =
    theme === "dark"
      ? "bg-[#050505]"
      : "bg-[rgba(255,255,255)]";

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`group relative overflow-hidden px-5 py-2.5 rounded-full text-sm font-bold tracking-wide border transition-all duration-300 ${
              isActive
                ? "bg-[var(--brand-accent)] text-black border-[var(--brand-accent)] shadow-lg"
                : passiveClass
            }`}
          >
            {!isActive && (
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="absolute -inset-[1px] rounded-full bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#0F9D58,#4285F4,#DB4437)] opacity-30 animate-[spin_4s_linear_infinite]" />
                <div
                  className={`absolute inset-[2px] rounded-full ${innerMaskClass}`}
                />
              </div>
            )}

            <span
              className={`relative z-10 transition ${
                isActive ? "text-black" : ""
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StaffTabs;