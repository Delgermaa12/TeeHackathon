import React from "react";
import { Link } from "react-router";
import type { StaffMember } from "../data/StaffData";
import { useAppContext } from "../context/AppContext";

interface StaffCardProps {
  person: StaffMember;
}

const StaffCard: React.FC<StaffCardProps> = ({ person }) => {
  const { language, theme } = useAppContext();

  const textMain = theme === "dark" ? "text-white" : "text-black";
  const textMuted = theme === "dark" ? "text-white/40" : "text-black/45";

  const cardClass =
    theme === "dark"
      ? "border-white/10 bg-white/[0.03]"
      : "border-black/10 bg-black/[0.03]";

  const imageWrapClass =
    theme === "dark"
      ? "overflow-hidden rounded-2xl mb-5 bg-white/5"
      : "overflow-hidden rounded-2xl mb-5 bg-black/5";

   const innerMaskClass =
    theme === "dark"
      ? "bg-[#050505]"
      : "bg-[rgba(255,255,255)]";

  return (
    <Link
      to={`/staff/${person.id}`}
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${cardClass}`}
    >
      {/* Rotating multi-color border */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="absolute -inset-[1px] rounded-3xl bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#0F9D58,#4285F4,#DB4437)] opacity-30 animate-[spin_4s_linear_infinite]" />
        <div className={`absolute inset-[2px] rounded-3xl ${innerMaskClass}`} />
      </div>

      {/* Main content */}
      <div className="relative z-10 p-5">
        <div className={imageWrapClass}>
          <img
            src={person.image}
            alt={person.name[language]}
            className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <h3 className={`text-xl font-bold mb-2 ${textMain}`}>{person.name[language]}</h3>

        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="text-xs tracking-[0.2em] text-[#eab308]">
            {person.role[language]}
          </p>
          <p className={`text-xs ${textMuted}`}>{person.experience[language]}</p>
        </div>
      </div>
    </Link>
  );
};

export default StaffCard;