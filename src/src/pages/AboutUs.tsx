import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const founderImage =
  "https://tee.education/wp-content/uploads/2022/10/DSC0443232-min-1024x683.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

const AboutUs = () => {
  const { theme, language } = useAppContext();
  const dark = theme === "dark";

  const bg = dark ? "bg-[#060810]" : "bg-[#f4f6fb]";
  const sectionAlt = dark ? "bg-[#0b0d1a]" : "bg-[#eef2f7]";
  const text = dark ? "text-white" : "text-[#111827]";
  const muted = dark ? "text-white/55" : "text-[#4b5563]";
  const faint = dark ? "text-white/35" : "text-[#6b7280]";
  const cardBg = dark
    ? "bg-white/[0.03] border-white/10"
    : "bg-white/80 border-[#d8dee8] shadow-[0_10px_30px_rgba(15,23,42,0.06)]";
  const hoverMask = dark ? "bg-[#060810]" : "bg-[#f4f6fb]";
  const hoverMaskAlt = dark ? "bg-[#0b0d1a]" : "bg-[#eef2f7]";

  const rotatingHover =
    "group relative overflow-hidden transition-all duration-300 hover:-translate-y-1";
  const rotatingLayer = () =>
    "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500";
  const rotatingBorder =
    "absolute -inset-[1px] bg-[conic-gradient(from_0deg,#DB4437,#F4B400,#4285F4,#DB4437)] opacity-25 animate-[spin_6s_linear_infinite]";
  const arcBorder = dark
    ? "border-t-white/10 border-r-white/10 border-b-white/10"
    : "border-t-[#cfd7e3] border-r-[#cfd7e3] border-b-[#cfd7e3]";
  const values = [
    {
      icon: "💡",
      title: language === "mn" ? "Бүтээлч байдал" : "Creativity",
      color: "#DB4437",
      angle: -62,
    },
    {
      icon: "🎓",
      title: language === "mn" ? "Чанартай боловсрол" : "Quality Education",
      color: "#F4B400",
      angle: 0,
    },
    {
      icon: "🌐",
      title: language === "mn" ? "Дэлхийн стандарт" : "Global Standard",
      color: "#22c55e",
      angle: 62,
    },
    {
      icon: "🚀",
      title: language === "mn" ? "Тасралтгүй өсөлт" : "Continuous Growth",
      color: "#4285F4",
      angle: 130,
    },
  ];

const timeline = [
  {
    year: "2019",
    side: "right",
    title: language === "mn" ? "TEEE байгуулагдсан" : "TEEE Founded",
    desc:
      language === "mn"
        ? "The Essential Engineering Education (TEEE) Монголд байгуулагдав."
        : "The Essential Engineering Education (TEEE) was founded in Mongolia.",
    yearColor: "text-[#DB4437]",
    dotColor: "bg-[#DB4437]",
  },
  {
    year: "2022",
    side: "left",
    title:
      language === "mn"
        ? "Тогтмол үйл ажиллагаа эхэлсэн"
        : "Regular Operations Started",
    desc:
      language === "mn"
        ? "Сургалтын тогтмол үйл ажиллагаа эхэлж, сурагчдын тоо нэмэгдэж эхэлсэн."
        : "Regular training programs started and the number of students began to grow.",
    yearColor: "text-[#F4B400]",
    dotColor: "bg-[#F4B400]",
  },
  {
    year: "2023",
    side: "right",
    title:
      language === "mn"
        ? "Сургуулийн системд шилжсэн"
        : "Transitioned to School System",
    desc:
      language === "mn"
        ? "Сургалтын бүтэц өргөжиж, илүү системтэй сургалтын хэлбэрт шилжсэн."
        : "The learning structure expanded and transitioned into a more organized school system.",
    yearColor: "text-[#22c55e]",
    dotColor: "bg-[#22c55e]",
  },
  {
    year: "2024",
    side: "left",
    title: language === "mn" ? "3 салбартай болсон" : "3 Branches Opened",
    desc:
      language === "mn"
        ? "Сургалтын хүрээ өргөжиж 3 салбар бүхий байгууллага болсон."
        : "The organization expanded to operate across three branches.",
    yearColor: "text-[#a855f7]",
    dotColor: "bg-[#a855f7]",
  },
  {
    year: "2025",
    side: "right",
    title: language === "mn" ? "5 салбартай болсон" : "Expanded to 5 Branches",
    desc:
      language === "mn"
        ? "Шинэ салбарууд нээгдэж, сургалтын орчин улам өргөжсөн."
        : "New branches were opened, expanding the learning environment.",
    yearColor: "text-[#f97316]",
    dotColor: "bg-[#f97316]",
  },
];

  const partners = [
    language === "mn" ? "Хаппинес сургууль" : "Happiness school",
    language === "mn" ? "Тусгал сургууль" : "Tusgal school",
    language === "mn" ? "Кинг кидссургууль" : "Kings kids school",
    language === "mn" ? "Лидер сургууль" : "Leader school",
  ];

  const branches = [
    {
      name: language === "mn" ? "Салбар 1" : "Branch 1",
      address: "SBD - 6 khoroo, Ulaanbaatar Mongolia",
      phone: "+976 90806161, 77240101-1",
      lat: 47.92616287822876,
      lng: 106.91530253575294,
    },
    {
      name: language === "mn" ? "Салбар 2" : "Branch 2",
      address: "Narnii Rd 14 зүүн талд, BZD - 43 khoroo, Ulaanbaatar Mongolia",
      phone: "+976 90806161, 77240101-2",
      lat: 47.90801471671595,
      lng: 106.93345712707304,
    },
    {
      name: language === "mn" ? "Салбар 3" : "Branch 3",
      address: "BGD - 6 khoroo, Ulaanbaatar Mongolia",
      phone: "+976 90806161, 77240101-3",
      lat: 47.916277270706914,
      lng: 106.8759302378168,
    },
    {
      name: language === "mn" ? "Салбар 4" : "Branch 4",
      address: "HUD - 6 khoroo, Ulaanbaatar Mongolia",
      phone: "+976 90806161, 77240101-4",
      lat: 47.8682287798907,
      lng: 106.81423186782499,
    },
    {
      name: language === "mn" ? "Салбар 5" : "Branch 5",
      address: "SBD - 5 khoroo, Ulaanbaatar Mongolia",
      phone: "+976 90806161, 77240101-5",
      lat: 47.925742386309615,
      lng: 106.90536299306237,
    },
  ];

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const mapSrc = useMemo(() => {
    const q = `${selectedBranch.lat},${selectedBranch.lng}`;
    return `https://maps.google.com/maps?hl=${
      language === "mn" ? "mn" : "en"
    }&q=${encodeURIComponent(q)}&z=15&output=embed`;
  }, [selectedBranch, language]);

  return (
    <div id="about-us" className={`${bg} min-h-screen`}>
      {/* Vision + Purpose + semicircle values */}
      <section className={`py-24 ${bg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h3
                className={`text-2xl md:text-5xl font-extrabold mb-5 ${text}`}
              >
                {language === "mn" ? "Эрхэм зорилго" : "Purpose"}
              </h3>
              <p className={`text-base md:text-lg leading-8 ${muted}`}>
                {language === "mn"
                  ? "Хүүхдүүдийг зөвхөн технологи хэрэглэгч биш, бүтээж сэтгэдэг, асуудал шийддэг, ирээдүйг удирдах чадвартай хүн болгон хөгжүүлэх."
                  : "To raise children who are not only users of technology, but also creators, problem-solvers, and future leaders."}
              </p>
            </div>
            <div className="relative z-10">
              <h2
                className={`text-2xl md:text-5xl font-extrabold mb-5 ${text}`}
              >
                {language === "mn" ? "Алсын хараа" : "Our Vision"}
              </h2>
              <p className={`text-base md:text-lg leading-8 ${muted}`}>
                {language === "mn"
                  ? "Теee нь Монголын ирээдүй хойч үеийнхнийг технологи давамгайлсан орчин үеийн ертөнцөд хөл тавих, манлайлах болон амжилтанд хүрэхэд зайлшгүй хэрэгцээт үндсэн чадварыг сургах. Мөн үргэлж шинэчлэгдэж буй технологийн салбрын нэн сүүлийн үеийн боловсорлыг үргэлж олгоход оршино."
                  : "Teee  empowers the next generation of Mongolia with the essential skills to thrive and lead in a technology-driven world, while continuously providing education based on the latest innovations in technology."}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
            className="relative min-h-[520px] hidden lg:flex items-center justify-center"
          >
            <div
              className={`absolute w-[420px] h-[420px] rounded-full border-[15px] border-transparent rotate-[35deg] opacity-70 ${arcBorder}`}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-1/2 text-center">
              <h3 className={`text-3xl md:text-4xl font-extrabold ${text}`}>
                {language === "mn" ? "Үнэт зүйлс" : "Core Values"}
              </h3>
            </div>

            {values.map((value, i) => {
              const radius = 200;
              const angle = (value.angle * Math.PI) / 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className={`${rotatingHover} rounded-full border ${cardBg} w-36 h-36 md:w-40 md:h-40`}
                  >
                    <div className={rotatingLayer()}>
                      <div className={`${rotatingBorder} rounded-full`} />
                      <div
                        className={`absolute inset-[2px] rounded-full ${hoverMask}`}
                      />
                    </div>

                    <div
                      className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4"
                      style={{ backgroundColor: `${value.color}22` }}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3">
                        {value.icon}
                      </div>
                      <h4
                        className={`font-bold text-sm md:text-base mb-1 ${text}`}
                      >
                        {value.title}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* mobile values */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            {values.map((value, i) => (
              <div
                key={i}
                className={`${rotatingHover} rounded-2xl border ${cardBg}`}
              >
                <div className={rotatingLayer()}>
                  <div className={`${rotatingBorder} rounded-2xl`} />
                  <div
                    className={`absolute inset-[2px] rounded-2xl ${hoverMask}`}
                  />
                </div>
                <div className="relative z-10 p-5 text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto"
                    style={{ backgroundColor: `${value.color}22` }}
                  >
                    {value.icon}
                  </div>
                  <h4 className={`font-bold text-sm mb-1 ${text}`}>
                    {value.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className={`py-16 ${sectionAlt}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-3xl border ${cardBg} max-w-[420px] mx-auto`}
            >
              <div className={rotatingLayer()}>
                <div className={`${rotatingBorder} rounded-3xl`} />
                <div
                  className={`absolute inset-[2px] rounded-3xl ${hoverMaskAlt}`}
                />
              </div>

              <div className="relative z-10">
                <div className="aspect-[4/4.8] overflow-hidden">
                  <img
                    src={founderImage}
                    alt="Founder"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/85 to-transparent">
                  <p className="text-white font-bold text-xl">
                    {language === "mn" ? "Үүсгэн байгуулагч" : "Founder & CEO"}
                  </p>
                  <p className="text-[#eab308] font-medium">TEEE</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={1}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <p className="text-7xl leading-none text-[#eab308]/25 font-serif">
                “
              </p>
              <blockquote
                className={`text-xl md:text-2xl font-medium leading-relaxed ${text}`}
              >
                {language === "mn"
                  ? "Инженерчлэлийн хичээлээр хүүхэд нэг асуудалд олон шийдэл байж болдгийг ойлгож, тэдгээрийг харьцуулж, логикоор дүн шинжилгээ хийж, өөртөө итгэлтэй шийдвэр гаргаж сурдаг."
                  : "Through engineering education, children learn that one problem can have many solutions, and they grow by comparing, analyzing, and choosing with confidence."}
              </blockquote>
              <p className="text-7xl leading-none text-[#eab308]/25 font-serif text-right">
                ”
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`py-16 ${bg}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-extrabold ${text}`}>
              {language === "mn" ? "Бидний түүх" : "Our Journey"}
            </h2>
          </motion.div>

          <div className="relative">
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] ${dark ? "bg-white/10" : "bg-[#d7dde8]"}`}
            />

            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={i * 0.12}
                  viewport={{ once: true }}
                  className="relative grid grid-cols-2 gap-6 items-center"
                >
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 ${
                      dark ? "border-[#060810]" : "border-white"
                    } ${item.dotColor} z-10`}
                  />

                  {item.side === "right" ? (
                    <>
                      <div />
                      <div
                        className={`${rotatingHover} rounded-2xl border ${cardBg}`}
                      >
                        <div className={rotatingLayer()}>
                          <div className={`${rotatingBorder} rounded-2xl`} />
                          <div
                            className={`absolute inset-[2px] rounded-2xl ${hoverMask}`}
                          />
                        </div>

                        <div className="relative z-10 p-4 pl-6">
                          <p
                            className={`text-sm font-black tracking-[0.18em] mb-1 ${item.yearColor}`}
                          >
                            {item.year}
                          </p>
                          <h3 className={`font-bold text-base mb-1 ${text}`}>
                            {item.title}
                          </h3>
                          <p className={`text-sm leading-6 ${muted}`}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`${rotatingHover} rounded-2xl border ${cardBg}`}
                      >
                        <div className={rotatingLayer()}>
                          <div className={`${rotatingBorder} rounded-2xl`} />
                          <div
                            className={`absolute inset-[2px] rounded-2xl ${hoverMask}`}
                          />
                        </div>

                        <div className="relative z-10 p-4 pr-6 text-right">
                          <p
                            className={`text-sm font-black tracking-[0.18em] mb-1 ${item.yearColor}`}
                          >
                            {item.year}
                          </p>
                          <h3 className={`font-bold text-base mb-1 ${text}`}>
                            {item.title}
                          </h3>
                          <p className={`text-sm leading-6 ${muted}`}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <div />
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-3xl md:text-4xl font-extrabold ${text}`}>
              {language === "mn"
                ? "Хамтрагч байгууллагууд"
                : "Partner Organizations"}
            </h2>
          </div>

          <div className="overflow-hidden">
            <div className="flex w-max gap-4 animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={i}
                  className={`${rotatingHover} rounded-full border ${cardBg} min-w-[220px]`}
                >
                  <div className={rotatingLayer()}>
                    <div className={`${rotatingBorder} rounded-full`} />
                    <div
                      className={`absolute inset-[2px] rounded-full ${hoverMaskAlt}`}
                    />
                  </div>

                  <div className="relative z-10 px-6 py-4 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${
                        dark
                          ? "bg-white/10 text-[#eab308]"
                          : "bg-white text-[#eab308]"
                      }`}
                    >
                      {partner[0]}
                    </div>
                    <span className={`font-medium ${text}`}>{partner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Single map + branch list */}
      <section id="contact" className={`py-16 ${bg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-extrabold mb-4 ${text}`}>
              {language === "mn" ? "Салбаруудын байршил" : "Branch Locations"}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
            <div
              className={`${rotatingHover} rounded-3xl border ${cardBg} h-full`}
            >
              <div className={rotatingLayer()}>
                <div className={`${rotatingBorder} rounded-3xl`} />
                <div
                  className={`absolute inset-[2px] rounded-3xl ${hoverMask}`}
                />
              </div>

              <div className="relative z-10 p-4 h-full">
                <div className="overflow-hidden rounded-2xl h-full min-h-[620px]">
                  <iframe
                    title="Main Branch Map"
                    src={mapSrc}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {branches.map((branch, i) => {
                const isActive = selectedBranch.name === branch.name;

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedBranch(branch)}
                    className={`${rotatingHover} w-full text-left rounded-2xl border ${cardBg} ${
                      isActive ? "ring-2 ring-[#eab308]/40" : ""
                    }`}
                  >
                    <div className={rotatingLayer()}>
                      <div className={`${rotatingBorder} rounded-2xl`} />
                      <div
                        className={`absolute inset-[2px] rounded-2xl ${hoverMask}`}
                      />
                    </div>

                    <div className="relative z-10 flex items-center gap-4 p-5">
                      {/* Text */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={16} className="text-[#eab308]" />
                          <h3 className={`font-bold text-base ${text}`}>
                            {branch.name}
                          </h3>
                        </div>

                        <p className={`text-sm leading-6 ${muted}`}>
                          {branch.address}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <Phone size={14} className="text-[#eab308]" />
                          <span className={`text-sm ${faint}`}>
                            {branch.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;