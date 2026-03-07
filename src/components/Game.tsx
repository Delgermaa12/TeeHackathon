import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Play, Box, Sparkles } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import OrbitImages from "./OrbitImages";

type ProjectType = "scratch" | "tinkercad";

type ProjectItem = {
  id: number;
  title: string;
  type: ProjectType;
  thumbnail: string;
  embedUrl?: string;
  openUrl?: string;
  student?: string;
  color?: string;
};

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Space Adventure",
    type: "scratch",
    thumbnail: "/projects/scratch-1.jpg",
    embedUrl: "https://scratch.mit.edu/projects/1249565877/embed",
    openUrl: "https://scratch.mit.edu/projects/1249565877",
    student: "Anu",
    color: "from-orange-400 to-yellow-300",
  },
  {
    id: 2,
    title: "Jump Hero",
    type: "scratch",
    thumbnail: "/projects/scratch-2.jpg",
    embedUrl: "https://scratch.mit.edu/projects/1201982030/embed",
    openUrl: "https://scratch.mit.edu/projects/1201982030",
    student: "Nomin",
    color: "from-orange-400 to-pink-400",
  },
  {
    id: 3,
    title: "Maze Game",
    type: "scratch",
    thumbnail: "/projects/scratch-3.jpg",
    embedUrl: "https://scratch.mit.edu/projects/1204900026/embed",
    openUrl: "https://scratch.mit.edu/projects/1204900026",
    student: "Saraa",
    color: "from-orange-300 to-red-400",
  },
  {
    id: 4,
    title: "Robot Car",
    type: "tinkercad",
    thumbnail: "/projects/tinker-1.jpg",
    openUrl:
      "https://www.tinkercad.com/things/lDrYycuCToU-funky-jaban-amberis",
    student: "Bilguun",
    color: "from-cyan-400 to-blue-400",
  },
];

const StudentProjectSection: React.FC = () => {
  const { theme, language } = useAppContext();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const orbitCards = useMemo(() => {
    return projects.map((project, index) => (
      <motion.button
        key={project.id}
        type="button"
        onClick={() => setSelectedProject(project)}
        aria-label={`${project.title}${project.student ? ` - ${project.student}` : ""}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ scale: 1.05, y: -8 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full h-full rounded-[28px] overflow-hidden shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3">
          <div
            className={`inline-flex items-center justify-center text-[10px] px-3 py-2 rounded-full font-black uppercase bg-gradient-to-r text-black ${
              project.color || "from-orange-400 to-yellow-300"
            }`}
          >
            {project.type === "scratch" ? (
              <Play size={12} aria-hidden="true" />
            ) : (
              <Box size={12} aria-hidden="true" />
            )}
          </div>
        </div>

        <div className="absolute bottom-3 left-4 right-4 text-left">
          <h3 className="text-white font-black text-sm leading-tight">
            {project.title}
          </h3>
          <p className="text-white/70 text-[10px] uppercase tracking-[0.2em] mt-1">
            {project.student}
          </p>
        </div>
      </motion.button>
    ));
  }, []);

  return (
    <>
      <section id="student-project" className="pt-8 pb-6 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-0 space-y-2">
            <div className="px-4 py-1 rounded-full border border-brand-secondary/30 text-brand-secondary text-[10px] uppercase tracking-[0.3em] font-black">
              {language === "mn" ? "Сурагчдын бүтээл" : "Student Projects"}
            </div>

            <h2
              className={`text-4xl md:text-6xl font-black ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {language === "mn"
                ? "Сурагчдын бүтээлүүд"
                : "Creative Student Works"}
            </h2>

            <p
              className={`text-sm max-w-xl ${
                isDark ? "text-white/60" : "text-black/60"
              }`}
            >
              {language === "mn"
                ? "Scratch тоглоом болон Tinkercad бүтээлүүд дээр дарж дэлгэрэнгүй үзээрэй."
                : "Click any Scratch game or Tinkercad project to preview it."}
            </p>
          </div>

          <div className="relative h-[300px] md:h-[580px] lg:h-[760px]">
            <OrbitImages
              items={orbitCards}
              interactive
              shape="ellipse"
              radiusX={450}
              radiusY={240}
              duration={32}
              itemSize={200}
              responsive
              showPath
              pathColor={
                isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"
              }
              pathWidth={1.6}
              centerContent={
                <div className="flex flex-col items-center text-center pointer-events-none">
                  <Sparkles
                    size={22}
                    className="text-brand-secondary mb-2"
                    aria-hidden="true"
                  />
                  <p
                    className={`text-xs uppercase tracking-[0.3em] font-bold ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    TEE PROJECTS
                  </p>
                </div>
              }
              className="mx-auto h-full"
            />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl ${
                isDark ? "bg-[#0d1117] text-white" : "bg-white text-black"
              }`}
            >
              <div
                className={`flex justify-between items-center p-4 border-b ${
                  isDark ? "border-white/10" : "border-black/10"
                }`}
              >
                <div>
                  <h3 className="font-black text-lg">{selectedProject.title}</h3>
                  {selectedProject.student && (
                    <p className={isDark ? "text-white/60 text-sm" : "text-black/60 text-sm"}>
                      {selectedProject.student}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  aria-label={language === "mn" ? "Цонх хаах" : "Close modal"}
                  onClick={() => setSelectedProject(null)}
                  className={`p-2 rounded-full transition ${
                    isDark
                      ? "hover:bg-white/10"
                      : "hover:bg-black/10"
                  }`}
                >
                  <X aria-hidden="true" />
                </button>
              </div>

              <div className="p-4">
                {selectedProject.type === "scratch" && selectedProject.embedUrl ? (
                  <div className="space-y-4">
                    <iframe
                      src={selectedProject.embedUrl}
                      title={selectedProject.title}
                      className="w-full h-[65vh] rounded-2xl border-0 bg-white"
                      allowFullScreen
                      loading="lazy"
                    />

                    <div className="flex justify-end">
                      <a
                        href={selectedProject.openUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-brand-secondary px-5 py-3 rounded-xl font-bold text-black"
                      >
                        <ExternalLink size={18} />
                        {language === "mn" ? "Scratch дээр нээх" : "Open in Scratch"}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 md:p-10">
                    <p
                      className={`mb-6 text-sm ${
                        isDark ? "text-white/70" : "text-black/70"
                      }`}
                    >
                      {language === "mn"
                        ? "Энэ бүтээл шинэ цонхонд нээгдэнэ."
                        : "This project opens in a new tab."}
                    </p>

                    <a
                      href={selectedProject.openUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-brand-secondary px-6 py-3 rounded-xl font-bold text-black"
                    >
                      <ExternalLink size={18} />
                      {language === "mn" ? "Төслийг нээх" : "Open Project"}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentProjectSection;