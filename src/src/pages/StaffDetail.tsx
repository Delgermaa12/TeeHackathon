import React from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Github,
  BookOpen,
  FileText,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Brain,
} from "lucide-react";
import { staffData } from "../data/StaffData";
import { translations } from "../translations";
import { useAppContext } from "../context/AppContext";

const skillColors = [
  "border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-transparent",
  "border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-transparent",
  "border-red-500/30 bg-gradient-to-r from-red-500/20 to-transparent",
  "border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 to-transparent",
  "border-green-500/30 bg-gradient-to-r from-green-500/20 to-transparent",
  "border-orange-500/30 bg-gradient-to-r from-orange-500/20 to-transparent",
];
const StaffDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { language, theme } = useAppContext();

  const person = staffData.find((item) => item.id === id);
  const t = translations[language].staff;

  const textMain = theme === "dark" ? "text-white" : "text-black";
  const textSoft = theme === "dark" ? "text-white/70" : "text-black/70";
  const textMuted = theme === "dark" ? "text-white/45" : "text-black/45";
  const cardBg =
    theme === "dark"
      ? "bg-white/[0.03] border-white/10"
      : "bg-black/[0.03] border-black/10";
  const innerBg =
    theme === "dark"
      ? "bg-white/[0.03] border-white/10"
      : "bg-black/[0.03] border-black/10";
  const softBg =
    theme === "dark"
      ? "bg-white/5 hover:bg-[#050505] border-white/10"
      : "bg-black/5 hover:bg-black/10 border-black/10";
  const innerMaskClass = theme === "dark" ? "bg-[#050505]" : "bg-white/10";

  if (!person) {
    return (
      <section className="min-h-screen pt-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/staff")}
            className={`group relative mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 overflow-hidden ${softBg} ${textSoft}`}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="absolute -inset-[1px] rounded-full bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#0F9D58,#4285F4,#DB4437)] opacity-30 animate-[spin_4s_linear_infinite]" />
              <div
                className={`absolute inset-[2px] rounded-full ${innerMaskClass}`}
              />
            </div>

            <span className="relative z-10 inline-flex items-center gap-2 group-hover:text-[#eab308] transition">
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              {t.back}
            </span>
          </button>

          <div className={`mt-10 rounded-3xl border p-8 text-center ${cardBg}`}>
            <h2 className={`text-2xl font-bold mb-3 ${textMain}`}>
              {t.notFound}
            </h2>
            <p className={textMuted}>{t.notFoundDesc}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/staff")}
          className={`group relative mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 overflow-hidden ${softBg} ${textSoft}`}
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
            <div className="absolute -inset-[1px] rounded-full bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#0F9D58,#4285F4,#DB4437)] opacity-30 animate-[spin_4s_linear_infinite]" />
            <div
              className={`absolute inset-[2px] rounded-full ${innerMaskClass}`}
            />
          </div>

          <span className="relative z-10 inline-flex items-center gap-2 group-hover:text-[#eab308] transition">
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {t.back}
          </span>
        </button>

        <div className="grid lg:grid-cols-[340px_1fr] gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* image card */}
            <div
              className={`relative group rounded-3xl border p-5 overflow-hidden ${cardBg}`}
            >
              {/* Rotating multi-color border */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-1000 transition duration-300">
                <div className="absolute -inset-[1px] rounded-3xl bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#0F9D58,#4285F4,#DB4437)] opacity-30 animate-[spin_4s_linear_infinite]" />
                <div
                  className={`absolute inset-[2px] rounded-3xl ${innerMaskClass}`}
                />
              </div>

              <div
                className={`relative overflow-hidden rounded-2xl ${theme === "dark" ? "bg-white/5" : "bg-black/5"}`}
              >
                <img
                  src={person.image}
                  alt={person.name[language]}
                  className="w-full h-[360px] object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* github */}
            <div className="flex flex-wrap gap-3">
              <a
                href={person.github || "#"}
                target="_blank"
                rel="noreferrer"
                className={`group relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 text-sm ${softBg} ${textSoft} hover:text-[#D4AF37]`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="absolute -inset-[1px] rounded-xl bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#0F9D58,#4285F4,#DB4437)] opacity-30 animate-[spin_4s_linear_infinite]" />
                  <div
                    className={`absolute inset-[2px] rounded-xl ${innerMaskClass}`}
                  />
                </div>

                <span className="relative z-10 inline-flex items-center gap-2">
                  <Github size={16} />
                  {t.github}
                </span>
              </a>
            </div>

            {/* certificates */}
            <div
              className={`relative group rounded-3xl border p-5 overflow-hidden ${cardBg}`}
            >
              {/* Rotating multi-color border */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-1000 transition duration-300">
                <div className="absolute -inset-[1px] rounded-3xl bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#0F9D58,#4285F4,#DB4437)] opacity-30 animate-[spin_4s_linear_infinite]" />
                <div
                  className={`absolute inset-[2px] rounded-3xl ${innerMaskClass}`}
                />
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={18} className="text-[#eab308]" />
                  <h3 className={`${textMain} text-xl font-bold`}>
                    {t.certificate}
                  </h3>
                </div>

                <div className="grid gap-4">
                  {person.courses.map((course) => (
                    <div
                      key={course.title[language]}
                      className={`group/item border rounded-xl overflow-hidden transition ${softBg}`}
                    >
                      <img
                        src={course.image}
                        alt={course.title[language]}
                        className="w-full h-full object-cover transition duration-500 group-hover/item:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className={`relative group rounded-3xl border p-6 md:p-8 overflow-hidden ${cardBg}`}
          >
            {/* Rotating multi-color border */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-1000 transition duration-300">
              <div className="absolute -inset-[1px] rounded-3xl bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#0F9D58,#4285F4,#DB4437)] opacity-30 animate-[spin_4s_linear_infinite]" />
              <div
                className={`absolute inset-[2px] rounded-3xl ${innerMaskClass}`}
              />
            </div>

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h1 className={`text-3xl md:text-4xl font-black ${textMain}`}>
                  {person.name[language]}
                </h1>
                <p className="text-[#eab308] text-sm font-semibold">
                  {person.role[language]}
                </p>
              </div>

              {/* description */}
              <div
                className={`rounded-2xl border p-5 mb-8 transition hover:-translate-y-0.5 ${innerBg}`}
              >
                <p className={`${textSoft} italic leading-8`}>
                  “{person.philosophy[language]}”
                </p>
              </div>

              {/* skills */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Brain size={18} className="text-[#eab308]" />
                  <h3 className={`${textMain} text-xl font-bold`}>
                    {t.skills}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {person.skills.map((skill, i) => (
                    <span
                      key={skill[language]}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300
      ${skillColors[i % skillColors.length]}
      ${textSoft}
      hover:scale-105`}
                    >
                      {skill[language]}
                    </span>
                  ))}
                </div>
              </div>

              {/* info cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div
                  className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 ${innerBg}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase size={18} className="text-[#eab308]" />
                    <span className={`text-sm ${textSoft}`}>
                      {t.experience}
                    </span>
                  </div>
                  <p className={`${textMain} font-medium`}>
                    {person.experience[language]}
                  </p>
                </div>

                <div
                  className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 ${innerBg}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap size={18} className="text-[#eab308]" />
                    <span className={`text-sm ${textSoft}`}>{t.education}</span>
                  </div>
                  <p className={`${textMain} font-medium`}>
                    {person.education[language]}
                  </p>
                </div>
              </div>

              {/* articles */}
              <div
                className={`border-t pt-8 ${
                  theme === "dark" ? "border-white/10" : "border-black/10"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={18} className="text-[#eab308]" />
                  <h3 className={`${textMain} text-xl font-bold`}>
                    {t.articles}
                  </h3>
                </div>

                <div className="space-y-4">
                  {person.articles.map((article) => (
                    <a
                      key={article.title[language]}
                      href={article.url || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className={`group/article relative overflow-hidden flex items-center justify-between gap-4 rounded-2xl border p-4 transition ${
                        innerBg
                      } ${
                        theme === "dark"
                          ? "hover:border-[#eab308]/40"
                          : "hover:border-[#eab308]/40"
                      }`}
                    >
                      {/* rotating border */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/article:opacity-1000 transition duration-300">
                        <div className="absolute -inset-[1px] rounded-2xl bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#0F9D58,#4285F4,#DB4437)] opacity-30 animate-[spin_4s_linear_infinite]" />
                        <div
                          className={`absolute inset-[2px] rounded-2xl ${innerMaskClass}`}
                        />
                      </div>

                      {/* content */}
                      <div className="relative z-10">
                        <p
                          className={`${textMain} font-semibold mb-1 group-hover/article:text-[#eab308] transition`}
                        >
                          {article.title[language]}
                        </p>
                        <p className={`text-sm ${textMuted}`}>
                          {article.category[language]} • {article.readTime[language]}
                        </p>
                      </div>

                      <ExternalLink
                        size={18}
                        className={`relative z-10 ${textMuted} shrink-0 group-hover/article:text-[#eab308] transition`}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffDetail;