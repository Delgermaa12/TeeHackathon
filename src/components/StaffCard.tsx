import React from "react";
import { Link } from "react-router-dom";
import type { StaffMember } from "../data/StaffData";
import { useAppContext } from "../context/AppContext";
import { translations } from "../translations";

interface StaffCardProps {
  person: StaffMember;
}

const StaffCard: React.FC<StaffCardProps> = ({ person }) => {
  const { language, theme } = useAppContext();

  const cardClass =
    theme === "dark"
      ? "bg-white/[0.03] border-white/10"
      : "bg-black/[0.03] border-black/10";

  const textMain = theme === "dark" ? "text-white" : "text-black";
  const textMuted = theme === "dark" ? "text-white/40" : "text-black/45";

  return (
    <Link
      to={`/staff/${person.id}`}
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${cardClass}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent" />

      <div className="relative p-5">
        <div
          className={
            theme === "dark"
              ? "overflow-hidden rounded-2xl mb-5 bg-white/5"
              : "overflow-hidden rounded-2xl mb-5 bg-black/5"
          }
        >
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <h3 className={`text-xl font-bold mb-2 ${textMain}`}>{person.name}</h3>

        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="text-xs tracking-[0.2em] text-[#D4AF37]">
            {person.role}
          </p>
          <p className={`text-xs ${textMuted}`}>{person.experience}</p>
        </div>
      </div>
    </Link>
  );
};

export default StaffCard;
