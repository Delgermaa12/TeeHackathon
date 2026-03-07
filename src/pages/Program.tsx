import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import scratchImage from '../assets/scratch.jpg';
import grade5Image from '../assets/5th_grade.jpg';
import grade6Image from '../assets/6th_grade.jpg';
import grade7Image from '../assets/7th_grade.jpg';
import grade8Image from '../assets/8th_grade.jpg';
import grade9Image from '../assets/9th_grade.jpg';

const Program = () => {
  const { theme, language } = useAppContext();

  const [filter, setFilter] = React.useState<'all' | 'beginner' | 'foundation' | 'intermediate' | 'advanced'>('all');
  const [showSurgaltuud, setShowSurgaltuud] = React.useState(false);
  const [surgaltuudFilter, setSurgaltuudFilter] = React.useState<'all' | 'zuslaan' | 'bogino'>('all');

  const gradePrograms = [
    { grade: '3', title: language === 'mn' ? '3 дугаар ангийн хөтөлбөр' : '3rd Grade Program', description: language === 'mn' ? 'Компьютерын үндэс, алгоритм, програмчлалын анхан шатыг сурах' : 'Learn computer basics, algorithms, and programming fundamentals', duration: language === 'mn' ? '9 сар' : '9 months', level: language === 'mn' ? 'Анхан шат' : 'Beginner', age: language === 'mn' ? '8-9 нас' : '8-9 years', image: scratchImage },
    { grade: '4', title: language === 'mn' ? '4 дүгээр ангийн хөтөлбөр' : '4th Grade Program', description: language === 'mn' ? 'Python програмчлал, логик сэтгэлгээг хөгжүүлэх' : 'Python programming and logical thinking development', duration: language === 'mn' ? '9 сар' : '9 months', level: language === 'mn' ? 'Анхан шат' : 'Beginner', age: language === 'mn' ? '9-10 нас' : '9-10 years', image: scratchImage },
    { grade: '5', title: language === 'mn' ? '5-р ангийн хөтөлбөр' : '5th Grade Program', description: language === 'mn' ? 'Вэб хөгжүүлэлт, HTML, CSS, JavaScript сурах' : 'Web development, HTML, CSS, JavaScript learning', duration: language === 'mn' ? '9 сар' : '9 months', level: language === 'mn' ? 'Дунд шат' : 'Intermediate', age: language === 'mn' ? '10-11 нас' : '10-11 years', image: grade5Image },
    { grade: '6', title: language === 'mn' ? '6-р ангийн хөтөлбөр' : '6th Grade Program', description: language === 'mn' ? 'Дизайн ба UI/UX үндэс, бүтээлч сэтгэлгээ' : 'Design and UI/UX basics, creative thinking', duration: language === 'mn' ? '9 сар' : '9 months', level: language === 'mn' ? 'Дунд шат' : 'Intermediate', age: language === 'mn' ? '11-12 нас' : '11-12 years', image: grade6Image },
    { grade: '7', title: language === 'mn' ? '7-р ангийн хөтөлбөр' : '7th Grade Program', description: language === 'mn' ? 'Мобайл хэрэгслэлийн хөгжүүлэлт ба дизайн' : 'Mobile app development and design', duration: language === 'mn' ? '9 сар' : '9 months', level: language === 'mn' ? 'Дунд шат' : 'Intermediate', age: language === 'mn' ? '12-13 нас' : '12-13 years', image: grade7Image },
    { grade: '8', title: language === 'mn' ? '8-р ангийн хөтөлбөр' : '8th Grade Program', description: language === 'mn' ? 'Өндөрлөг програмчлал, өгөгдлийн бүтэц' : 'Advanced programming, data structures', duration: language === 'mn' ? '9 сар' : '9 months', level: language === 'mn' ? 'Ахисан шат' : 'Advanced', age: language === 'mn' ? '13-14 нас' : '13-14 years', image: grade8Image },
    { grade: '9', title: language === 'mn' ? '9-р ангийн хөтөлбөр' : '9th Grade Program', description: language === 'mn' ? 'AI, машин сургалт ба системүүдийн зарчим' : 'AI, machine learning and systems principles', duration: language === 'mn' ? '9 сар' : '9 months', level: language === 'mn' ? 'Ахисан шат' : 'Advanced', age: language === 'mn' ? '14-15 нас' : '14-15 years', image: grade9Image },
  ];

  const surgaltuudList = [
    { id: 1, name: 'Scratch Pixels', category: 'zuslaan', tag: language === 'mn' ? 'Зуслан' : 'Summer', tagColor: 'bg-green-500', price: '₮850,000', description: language === 'mn' ? '9-11 насны хүүхдүүдэд зориулагдсан програмчлалын анхан шатны сургалт' : 'Beginner programming course for ages 9-11', duration: language === 'mn' ? '5 өдөр' : '5 days', age: language === 'mn' ? '9-11 нас' : '9-11 years', level: language === 'mn' ? 'Анхан шат' : 'Beginner', color: 'from-green-400 to-emerald-600', icon: '🎮' },
    { id: 2, name: 'Zero 2 Hero', category: 'zuslaan', tag: language === 'mn' ? 'Зуслан' : 'Summer', tagColor: 'bg-green-500', price: '₮850,000', description: language === 'mn' ? '12-16 насныханд зориулсан Python хэл дээрх тоглоом хөгжүүлэлтийн сургалт' : 'Python game development course for ages 12-16', duration: language === 'mn' ? '5 өдөр' : '5 days', age: language === 'mn' ? '12-16 нас' : '12-16 years', level: language === 'mn' ? 'Суурь - Дунд шат' : 'Foundation - Intermediate', color: 'from-orange-400 to-red-500', icon: '🐍' },
    { id: 3, name: 'Electrikid', category: 'zuslaan', tag: language === 'mn' ? 'Зуслан' : 'Summer', tagColor: 'bg-green-500', price: '₮850,000', description: language === 'mn' ? '9-13 насныханд зориулсан электроникийн анхан шатны сургалт' : 'Electronics beginner course for ages 9-13', duration: language === 'mn' ? '5 өдөр' : '5 days', age: language === 'mn' ? '9-13 нас' : '9-13 years', level: language === 'mn' ? 'Анхан шат' : 'Beginner', color: 'from-cyan-400 to-blue-500', icon: '⚡' },
    { id: 4, name: 'Electrikid Crash Course', category: 'bogino', tag: language === 'mn' ? 'Богино хугацааны' : 'Short-term', tagColor: 'bg-orange-500', price: '₮350,000', description: language === 'mn' ? '9-13 насныханд зориулсан электроникийн тургавчилсан сургалт' : 'Intensive electronics course for ages 9-13', duration: language === 'mn' ? '3 өдөр' : '3 days', age: language === 'mn' ? '9-13 нас' : '9-13 years', level: language === 'mn' ? 'Анхан шат' : 'Beginner', color: 'from-purple-400 to-violet-600', icon: '🔌' },
    { id: 5, name: 'Web Design 101', category: 'bogino', tag: language === 'mn' ? 'Богино хугацааны' : 'Short-term', tagColor: 'bg-orange-500', price: '₮250,000', description: language === 'mn' ? 'Вэб дизайн, HTML/CSS-ийн суурь сургалт' : 'Web design and HTML/CSS basics course', duration: language === 'mn' ? '4 долоо хоног (8 цаг)' : '4 weeks (8 hrs)', age: language === 'mn' ? '12-16 нас' : '12-16 years', level: language === 'mn' ? 'Анхан шат' : 'Beginner', color: 'from-orange-400 to-pink-500', icon: '🌐' },
    { id: 6, name: 'Python Programmer', category: 'bogino', tag: language === 'mn' ? 'Богино хугацааны' : 'Short-term', tagColor: 'bg-orange-500', price: '₮300,000', description: language === 'mn' ? 'Python програмчлалын анхан шатны сургалт' : 'Python programming beginner course', duration: language === 'mn' ? '6 долоо хоног (12 цаг)' : '6 weeks (12 hrs)', age: language === 'mn' ? '11-15 нас' : '11-15 years', level: language === 'mn' ? 'Анхан шат' : 'Beginner', color: 'from-blue-400 to-cyan-500', icon: '💻' },
  ];

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
    { key: 'zuslaan', mn: '🏕️ Зуслан', en: '🏕️ Summer' },
    { key: 'bogino', mn: '⚡ Богино хугацааны', en: '⚡ Short-term' },
  ];

  const pill = (active: boolean) =>
    `px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
      active
        ? 'bg-blue-900 border-blue-600 text-white shadow-lg shadow-blue-900/40'
        : theme === 'dark'
        ? 'bg-transparent border-blue-800 text-blue-300 hover:bg-blue-900/30 hover:border-blue-600'
        : 'bg-transparent border-blue-600 text-blue-700 hover:bg-blue-700 hover:text-white'
    }`;

  return (
    <div id="program" className={`min-h-screen ${theme === 'dark' ? 'bg-[#060810]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

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
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGrades.map((program, index) => (
                  <motion.div
                    key={program.grade}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className={`relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <div
                      className="absolute inset-0 h-64 bg-cover bg-center"
                      style={{ backgroundImage: `url('${program.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
                    </div>
                    <div className="absolute top-0 left-0 right-0 z-10">
                      <div className={`inline-block px-4 py-2 m-4 rounded-lg font-bold text-white text-lg backdrop-blur-sm ${index % 3 === 0 ? 'bg-blue-600/90' : index % 3 === 1 ? 'bg-purple-600/90' : 'bg-orange-600/90'}`}>
                        {language === 'mn' ? `${program.grade} дугаар анги` : `Grade ${program.grade}`}
                      </div>
                    </div>
                    <div className="relative pt-64 pb-6 px-6 h-full flex flex-col">
                      <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{program.title}</h3>
                      <p className={`text-sm mb-4 flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{program.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4 text-xs">
                        <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1 ${theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>🕐 {program.duration}</span>
                        <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1 ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>⭐ {program.level}</span>
                        <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1 ${theme === 'dark' ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700'}`}>👤 {program.age}</span>
                      </div>
                      <motion.a href="#" whileHover={{ x: 5 }} className={`text-sm font-bold flex items-center gap-1 transition-colors ${theme === 'dark' ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}>
                        {language === 'mn' ? 'Дэлгэрэнгүй' : 'Details'} →
                      </motion.a>
                    </div>
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
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSurgaltuud.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className={`relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <div className={`relative h-44 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                      <span className="text-6xl">{course.icon}</span>
                      <span className={`absolute top-3 right-3 ${course.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{course.tag}</span>
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white text-sm font-bold px-3 py-1 rounded-lg backdrop-blur-sm">{course.price}</div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className={`text-base font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{course.name}</h3>
                      <p className={`text-xs mb-4 flex-grow ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{course.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4 text-xs">
                        <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1 ${theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>🕐 {course.duration}</span>
                        <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1 ${theme === 'dark' ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700'}`}>👤 {course.age}</span>
                        <span className={`px-2 py-1 rounded-full font-medium flex items-center gap-1 ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>⭐ {course.level}</span>
                      </div>
                      <button className="w-full py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors">
                        {language === 'mn' ? 'Дэлгэрэнгүй →' : 'Details →'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Marquee */}
      <div className={`w-screen mt-20 py-8 overflow-hidden border-y ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-200/50 border-gray-300'}`}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>HTML/CSS</span>
              <span className="text-3xl">●</span>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>JavaScript</span>
              <span className="text-3xl">●</span>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Python</span>
              <span className="text-3xl">●</span>
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>UI/UX Design</span>
              <span className="text-3xl">●</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Program;