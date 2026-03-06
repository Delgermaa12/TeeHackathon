import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const StaffDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { language, theme } = useAppContext();

  const person = staffData.find((item) => item.id === id);
  const t = translations[language].staff;

  const textMain = theme === "dark" ? "text-white" : "text-black";
  const textSoft = theme === "dark" ? "text-white/70" : "text-black/70";
  const textMuted = theme === "dark" ? "text-white/45" : "text-black/45";
  const textFaint = theme === "dark" ? "text-white/35" : "text-black/35";
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
      ? "bg-white/5 hover:bg-white/10 border-white/10"
      : "bg-black/5 hover:bg-black/10 border-black/10";

  if (!person) {
    return (
      <section className="min-h-screen pt-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/staff")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition ${softBg} ${textSoft}`}
          >
            <ArrowLeft size={16} />
            {t.back}
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
          className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border transition ${softBg} ${textSoft}`}
        >
          <ArrowLeft size={16} />
          {t.back}
        </button>

        <div className="grid lg:grid-cols-[340px_1fr] gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* image card */}
            <div
              className={`relative group rounded-3xl border p-5 overflow-hidden ${cardBg}`}
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/50" />
                <div className="absolute -inset-[1px] rounded-3xl bg-[conic-gradient(from_0deg,transparent,rgba(212,175,55,0.9),transparent)] opacity-30" />
              </div>

              <div
                className={`relative overflow-hidden rounded-2xl ${theme === "dark" ? "bg-white/5" : "bg-black/5"}`}
              >
                <img
                  src={person.image}
                  alt={person.name}
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition text-sm ${softBg} ${textSoft} hover:text-[#D4AF37]`}
              >
                <Github size={16} />
                {t.github}
              </a>
            </div>

            {/* certificates */}
            <div
              className={`relative group rounded-3xl border p-5 overflow-hidden ${cardBg}`}
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/50" />
                <div className="absolute -inset-[1px] rounded-3xl bg-[conic-gradient(from_0deg,transparent,rgba(212,175,55,0.9),transparent)] opacity-30" />
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={18} className="text-[#D4AF37]" />
                  <h3 className={`${textMain} text-xl font-bold`}>
                    {t.certificate}
                  </h3>
                </div>

                <div className="grid gap-4">
                  {person.courses.map((course) => (
                    <div
                      key={course.title}
                      className={`group/item border rounded-xl overflow-hidden transition ${softBg}`}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
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
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500">
              <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/50" />
              <div className="absolute -inset-[1px] rounded-3xl bg-[conic-gradient(from_0deg,transparent,rgba(212,175,55,0.8),transparent)] opacity-30" />
            </div>

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h1 className={`text-3xl md:text-4xl font-black ${textMain}`}>
                  {person.name}
                </h1>
                <p className="text-[#D4AF37] text-sm font-semibold">
                  {person.role}
                </p>
              </div>

              {/* description */}
              <div className={`rounded-2xl border p-5 mb-8 transition hover:-translate-y-0.5 ${innerBg}`}>
                <p
                  className={`text-xs uppercase tracking-[0.25em] mb-3 ${textFaint}`}
                >
                  {t.description}
                </p>
                <p className={`${textSoft} italic leading-8`}>
                  “{person.philosophy}”
                </p>
              </div>

              {/* skills */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Brain size={18} className="text-[#D4AF37]" />
                  <h3 className={`${textMain} text-xl font-bold`}>
                    {t.skills}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-xl border text-sm transition ${
                        theme === "dark"
                          ? "border-white/10 bg-white/5 text-white/75 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                          : "border-black/10 bg-black/5 text-black/75 hover:border-[#D4AF37]/50 hover:text-[#B88900]"
                      }`}
                    >
                      {skill}
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
                    <Briefcase size={18} className="text-[#D4AF37]" />
                    <span className={`text-sm ${textSoft}`}>
                      {t.experience}
                    </span>
                  </div>
                  <p className={`${textMain} font-medium`}>
                    {person.experience}
                  </p>
                </div>

                <div
                  className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 ${innerBg}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap size={18} className="text-[#D4AF37]" />
                    <span className={`text-sm ${textSoft}`}>{t.education}</span>
                  </div>
                  <p className={`${textMain} font-medium`}>
                    {person.education}
                  </p>
                </div>
              </div>

              {/* articles */}
              <div
                className={`border-t pt-8 ${theme === "dark" ? "border-white/10" : "border-black/10"}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={18} className="text-[#D4AF37]" />
                  <h3 className={`${textMain} text-xl font-bold`}>
                    {t.articles}
                  </h3>
                </div>

                <div className="space-y-4">
                  {person.articles.map((article) => (
                    <a
                      key={article.title}
                      href={article.url || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className={`group/article flex items-center justify-between gap-4 rounded-2xl border p-4 transition ${innerBg} ${
                        theme === "dark"
                          ? "hover:bg-white/[0.05] hover:border-[#D4AF37]/40"
                          : "hover:bg-black/[0.05] hover:border-[#D4AF37]/40"
                      }`}
                    >
                      <div>
                        <p
                          className={`${textMain} font-semibold mb-1 group-hover/article:text-[#D4AF37] transition`}
                        >
                          {article.title}
                        </p>
                        <p className={`text-sm ${textMuted}`}>
                          {article.category} • {article.readTime}
                        </p>
                      </div>

                      <ExternalLink
                        size={18}
                        className={`${textMuted} shrink-0 group-hover/article:text-[#D4AF37] transition`}
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
