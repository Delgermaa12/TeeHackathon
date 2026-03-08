import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { useDataContext } from '../context/DataContext';
import scratchImage from '../assets/scratch.jpg';
import grade5Image from '../assets/5th_grade.jpg';
import grade6Image from '../assets/6th_grade.jpg';
import grade7Image from '../assets/7th_grade.jpg';
import grade8Image from '../assets/8th_grade.jpg';
import grade9Image from '../assets/9th_grade.jpg';
import electrikidImage from '../assets/electrikid.jpg';
import zerotoheroImage from '../assets/zerotohero.jpg';
import scratchpixelImage from '../assets/scratchpixels.jpg';

const Program = () => {
  const { theme, language } = useAppContext();

  const [filter, setFilter] = React.useState<'all' | 'beginner' | 'foundation' | 'intermediate' | 'advanced'>('all');
  const [showSurgaltuud, setShowSurgaltuud] = React.useState(false);
  const [surgaltuudFilter, setSurgaltuudFilter] = React.useState<'all' | 'zuslaan' | 'bogino'>('all');

  const { programs } = useDataContext();

  const gradePrograms = React.useMemo(() => {
    return programs
      .filter(p => p.title.toLowerCase().includes('анги') || p.title.toLowerCase().includes('grade'))
      .map((p) => {
        const defaultImages: Record<string, string> = {
          '3': scratchImage,
          '5': grade5Image,
          '6': grade6Image,
          '7': grade7Image,
          '8': grade8Image,
          '9': grade9Image,
        };
        const gradeMatch = p.title.match(/(\d+)/);
        const grade = gradeMatch ? gradeMatch[1] : '3';
        
        return {
          id: p.id,
          grade: grade,
          title: p.title,
          description: p.description || '',
          duration: p.duration,
          level: p.level,
          age: p.ageGroup || '',
          image: p.coverImage || defaultImages[grade] || scratchImage
        };
      });
  }, [programs, language]);

  const surgaltuudList = React.useMemo(() => {
    return programs
      .filter(p => !p.title.toLowerCase().includes('анги') && !p.title.toLowerCase().includes('grade'))
      .map((p, index) => {
        const colors = ['from-green-400 to-emerald-600', 'from-orange-400 to-red-500', 'from-cyan-400 to-blue-500', 'from-purple-400 to-violet-600'];
        const icons = ['fa-gamepad', 'fa-code', 'fa-bolt', 'fa-plug'];
        const bImages = [scratchpixelImage, zerotoheroImage, electrikidImage];
        
        return {
          id: p.id,
          name: p.title,
          category: p.category || (index % 2 === 0 ? 'zuslaan' : 'bogino'),
          tag: p.category === 'zuslaan' ? (language === 'mn' ? 'Зуслан' : 'Summer') : (language === 'mn' ? 'Богино хугацааны' : 'Short-term'),
          tagColor: p.category === 'zuslaan' ? 'bg-green-500' : 'bg-orange-500',
          price: p.price || (language === 'mn' ? 'Үнэ тохироогүй' : 'Price not set'),
          description: p.description || '',
          duration: p.duration,
          age: p.ageGroup || '',
          level: p.level,
          color: p.color || colors[index % colors.length],
          icon: p.icon || icons[index % icons.length],
          image: p.coverImage || bImages[index % bImages.length] || null,
        };
      });
  }, [programs, language]);

  const filteredGrades = gradePrograms.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'beginner') return ['3', '4'].includes(p.grade);
    if (filter === 'foundation') return p.grade === '5';
    if (filter === 'intermediate') return ['6', '7'].includes(p.grade);
    if (filter === 'advanced') return ['8', '9'].includes(p.grade);
    return true;
  });

  const filteredSurgaltuud = surgaltuudList.filter((c) => {
    if (surgaltuudFilter === 'all') return true;
    return c.category === surgaltuudFilter;
  });

  const gradeFilterOptions = [
    { key: 'all', mn: 'Бүгд', en: 'All' },
    { key: 'beginner', mn: 'Анхан шат', en: 'Beginner' },
    { key: 'foundation', mn: 'Суурь шат', en: 'Foundation' },
    { key: 'intermediate', mn: 'Дунд шат', en: 'Intermediate' },
    { key: 'advanced', mn: 'Ахисан шат', en: 'Advanced' },
  ];

  const surgaltuudFilterOptions = [
    { key: 'all', mn: 'Бүгд', en: 'All' },
    { key: 'zuslaan', mn: 'Зуслан', en: 'Summer' },
    { key: 'bogino', mn: 'Богино хугацааны', en: 'Short-term' },
  ];

  const pill = (active: boolean) =>
    `px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
      active
        ? 'bg-[#F4B400] border-[#F4B400] text-black shadow-lg shadow-yellow-500/40'
        : theme === 'dark'
        ? 'bg-transparent border-[#F4B400]/60 text-[#F4B400] hover:bg-[#F4B400]/15 hover:border-[#F4B400]'
        : 'bg-transparent border-[#F4B400] text-[#A87900] hover:bg-[#F4B400] hover:text-black'
    }`;

  return (
    <div id="program" className={`min-h-screen pt-32 pb-20 ${theme === 'dark' ? 'bg-[#060810]' : 'bg-gray-50'}`}>
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header — changes based on panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={showSurgaltuud ? 'surgaltuud' : 'hotolbor'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              {showSurgaltuud
                ? (language === 'mn' ? 'Төлбөртэй Сургалтууд' : 'Paid Courses')
                : (language === 'mn' ? 'Үндсэн Хөтөлбөрүүд' : 'Main Programs')}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={showSurgaltuud ? 'sub-surgaltuud' : 'sub-hotolbor'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {showSurgaltuud
                ? (language === 'mn' ? 'Амралтын зуслан болон богино хугацааны эрчимжүүлсэн сургалт' : 'Summer camp and short intensive courses')
                : (language === 'mn' ? '3-9-р ангийн сурагчдийн хөтөлбөрүүд' : 'Programs for grades 3-9')}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* ── Filter row — only ONE set visible at a time ── */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            {!showSurgaltuud ? (
              /* Grade filters + Сургалтууд button on right */
              <motion.div
                key="grade-filters"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between gap-4 flex-wrap"
              >
                <div className="flex gap-3 flex-wrap">
                  {gradeFilterOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setFilter(opt.key as typeof filter)}
                      className={pill(filter === opt.key)}
                    >
                      {language === 'mn' ? opt.mn : opt.en}
                    </button>
                  ))}
                </div>
                {/* Сургалтууд ▶ on the right */}
                <button
                  onClick={() => setShowSurgaltuud(true)}
                  className={pill(false) + ' flex items-center gap-2 font-bold'}
                >
                  {language === 'mn' ? 'Сургалтууд' : 'Courses'} ▶
                </button>
              </motion.div>
            ) : (
              /* ◀ Back button on left + Сургалтууд sub-filters */
              <motion.div
                key="surgaltuud-filters"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between gap-4 flex-wrap"
              >
                {/* ◀ back button on the LEFT */}
                <button
                  onClick={() => setShowSurgaltuud(false)}
                  className={pill(false) + ' flex items-center gap-2 font-bold'}
                >
                  ◀ {language === 'mn' ? 'Хөтөлбөр' : 'Programs'}
                </button>
                {/* Sub-filters */}
                <div className="flex gap-3 flex-wrap">
                  {surgaltuudFilterOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setSurgaltuudFilter(opt.key as typeof surgaltuudFilter)}
                      className={pill(surgaltuudFilter === opt.key)}
                    >
                      {language === 'mn' ? opt.mn : opt.en}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Card panels — only one rendered at a time ── */}
        <AnimatePresence mode="wait">
          {!showSurgaltuud ? (
            <motion.div
              key="grade-panel"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGrades.map((program, index) => (
                  <motion.div
                    key={program.grade}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.02 }}
                    className="h-full"
                  >
                    <Link to={`/programm/course/${program.id}`} className="block h-full">
                      <div className={`relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        {/* Image area — fixed height, image anchored to top */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={program.image}
                            alt={program.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
                          {/* Grade badge */}
                          <div className="absolute top-0 left-0 right-0 z-10">
                            <div className={`inline-block px-4 py-2 m-4 rounded-lg font-bold text-white text-lg backdrop-blur-sm ${index % 3 === 0 ? 'bg-blue-600/90' : index % 3 === 1 ? 'bg-purple-600/90' : 'bg-orange-600/90'}`}>
                              {language === 'mn' ? `${program.grade} дугаар анги` : `Grade ${program.grade}`}
                            </div>
                          </div>
                        </div>

                        {/* Text content — tighter padding */}
                        <div className="px-5 pt-4 pb-5 flex flex-col">
                          <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{program.title}</h3>
                          <p className={`text-sm mb-4 flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{program.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1.5 ${theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                              <i className="fa fa-clock" /> {program.duration}
                            </span>
                            <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1.5 ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                              <i className="fa fa-star" /> {program.level}
                            </span>
                            <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1.5 ${theme === 'dark' ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700'}`}>
                              <i className="fa fa-user" /> {program.age}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="surgaltuud-panel"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSurgaltuud.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.02 }}
                    className="h-full"
                  >
                    <Link to={`/programm/course/${course.id}`} className="block h-full">
                      <div className={`relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col group h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>

                        {/* Image / gradient header — anchored to top */}
                        <div className={`relative h-48 overflow-hidden ${!course.image ? `bg-gradient-to-br ${course.color}` : ''}`}>
                          {course.image ? (
                            <>
                              <img
                                src={course.image}
                                alt={course.name}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              />
                            </>
                          ) : (
                            /* fallback: gradient + FA icon centered */
                            <div className="absolute inset-0 flex items-center justify-center">
                              <i className={`fa-solid ${course.icon} text-white/80 text-6xl`} />
                            </div>
                          )}

                          {/* Tag badge — top right */}
                          <span className={`absolute top-3 right-3 ${course.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full z-10`}>
                            {course.tag}
                          </span>

                          {/* Price — bottom left */}
                          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-sm font-bold px-3 py-1 rounded-lg backdrop-blur-sm z-10">
                            {course.price}
                          </div>
                        </div>

                        {/* Text content */}
                        <div className="px-5 pt-4 pb-5 flex flex-col flex-grow">
                          <h3 className={`text-base font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{course.name}</h3>
                          <p className={`text-xs mb-4 flex-grow ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{course.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1.5 ${theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                              <i className="fa fa-clock" /> {course.duration}
                            </span>
                            <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1.5 ${theme === 'dark' ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700'}`}>
                              <i className="fa fa-user" /> {course.age}
                            </span>
                            <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1.5 ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                              <i className="fa fa-star" /> {course.level}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Marquee Section */}
      <div className={`mt-32 py-12 overflow-hidden border-y relative ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
        {/* Gradient overlays for smooth fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-inherit to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-inherit to-transparent z-10" />

        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear"
              }
            }}
            className="flex items-center gap-12 px-6"
          >
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <span className={`text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-300 hover:text-brand-primary opacity-20 hover:opacity-100 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  UI/UX Design
                </span>
                <span className="text-[#F4B400] text-2xl">✦</span>
                <span className={`text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-300 hover:text-blue-500 opacity-20 hover:opacity-100 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  React JS
                </span>
                <span className="text-[#F4B400] text-2xl">✦</span>
                <span className={`text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-300 hover:text-orange-500 opacity-20 hover:opacity-100 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Python
                </span>
                <span className="text-[#F4B400] text-2xl">✦</span>
                <span className={`text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-300 hover:text-green-500 opacity-20 hover:opacity-100 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  HTML/CSS
                </span>
                <span className="text-[#F4B400] text-2xl">✦</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Program;
