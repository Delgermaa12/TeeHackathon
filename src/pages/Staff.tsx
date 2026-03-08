import React, { useMemo, useState } from "react";
import StaffTabs from "../components/StaffTabs";
import StaffCard from "../components/StaffCard";
import { staffData } from "../data/StaffData";
import { useAppContext } from "../context/AppContext";
import { useDataContext } from "../context/DataContext";
import { translations } from "../translations";
import type { Teacher } from "../types/admin";

type StaffTab = "all" | "udirdlaga" | "bagsh";

const Staff: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StaffTab>("all");
  const { language, theme } = useAppContext();
  const { teachers } = useDataContext();

  const t = translations[language].staff;

  const allStaff = useMemo(() => {
    // Map dynamic teachers to StaffMember shape for StaffCard
    const dynamicStaff = teachers.map((t: Teacher) => ({
      id: t.id,
      name: { mn: t.name, en: t.name },
      role: { mn: t.specialization, en: t.specialization },
      type: t.type,
      image: t.avatar || "https://tee.education/wp-content/uploads/2022/10/DSC0443232-min-1024x683.jpg",
      philosophy: { mn: t.philosophy || t.bio || '', en: t.philosophy || t.bio || '' },
      experience: { mn: t.experience || '', en: t.experience || '' },
      education: { mn: t.education || '', en: t.education || '' },
      skills: t.skills?.map((s: string) => ({ mn: s, en: s })) || [],
      courses: t.certificates?.map((c: any) => ({ title: { mn: c.title, en: c.title }, image: c.image })) || [],
      articles: []
    }));

    // For now, if dynamicStaff is empty (e.g. first load), fallback to staffData
    // but ultimately we want everything in DataContext
    return dynamicStaff.length > 0 ? dynamicStaff : staffData;
  }, [teachers]);

  const filteredStaff = useMemo(() => {
    if (activeTab === "all") return allStaff;
    return allStaff.filter((item: any) => item.type === activeTab);
  }, [activeTab, allStaff]);

  const panelClass =
    theme === "dark"
      ? "bg-white/[0.03] border-white/10"
      : "bg-black/[0.03] border-black/10";

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <StaffTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((person: any) => (
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