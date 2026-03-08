import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useDataContext } from '../context/DataContext';
import { ArrowLeft, CheckCircle, Clock, Users, Award, BookOpen, Code, Zap, DollarSign } from 'lucide-react';
import zuslanBg from '../assets/zuslan.jpg';
import zerotoheroImage from '../assets/zerotohero.jpg';
import electrikidImage from '../assets/electrikid.jpg';

const ProgramCourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { theme, language } = useAppContext();
  const { programs } = useDataContext();

  const courses = [
    {
      id: 1,
      name: 'Scratch Pixels',
      category: 'zuslaan',
      tag: language === 'mn' ? 'Зуслан' : 'Summer',
      tagColor: 'bg-green-500',
      price: '₮850,000',
      description: language === 'mn' ? '9-11 насны хүүхдүүдэд зориулагдсан програмчлалын анхан шатны сургалт' : 'Beginner programming course for ages 9-11',
      duration: language === 'mn' ? '5 өдөр' : '5 days',
      age: language === 'mn' ? '9-11 нас' : '9-11 years',
      level: language === 'mn' ? 'Анхан шат' : 'Beginner',
      color: 'from-green-400 to-emerald-600',
      icon: '🎮',
      details: language === 'mn' ? 'Энэхүү зуслангийн сургалт нь 9-11 насны хүүхдүүдэд зориулсан бөгөөд Scratch програмчлалын хэлийг ашиглан тоглоом бүтээх, алгоритмын сэтгэлгээг хөгжүүлэхэд чиглэгдэнэ. Хүүхдүүд өөрсдийн бүтээлч санааг хэрэгжүүлж, програмчлалын анхан шаттай танилцана.' : 'This summer course is designed for children aged 9-11, focusing on creating games using Scratch programming language and developing algorithmic thinking. Children will implement their creative ideas and get familiar with the basics of programming.',
      curriculum: [
        language === 'mn' ? 'Scratch орчны танилцуулга' : 'Scratch Environment Introduction',
        language === 'mn' ? 'Блок програмчлалын үндэс' : 'Block Programming Basics',
        language === 'mn' ? 'Тоглоом бүтээх' : 'Game Development',
        language === 'mn' ? 'Анимэйшн үүсгэх' : 'Creating Animations',
        language === 'mn' ? 'Төсөл хамгаалах' : 'Project Presentation'
      ],
      tools: ['Scratch', 'Visual Programming'],
      iconComponent: BookOpen
    },
    {
      id: 2,
      name: 'Zero 2 Hero',
      category: 'zuslaan',
      tag: language === 'mn' ? 'Зуслан' : 'Summer',
      tagColor: 'bg-green-500',
      price: '₮850,000',
      description: language === 'mn' ? '12-16 насныханд зориулсан Python хэл дээрх тоглоом хөгжүүлэлтийн сургалт' : 'Python game development course for ages 12-16',
      duration: language === 'mn' ? '5 өдөр' : '5 days',
      age: language === 'mn' ? '12-16 нас' : '12-16 years',
      level: language === 'mn' ? 'Суурь - Дунд шат' : 'Foundation - Intermediate',
      color: 'from-orange-400 to-red-500',
      icon: '🐍',
      details: language === 'mn' ? '12-16 насны өсвөр үеийнхэнд зориулсан энэхүү зуслангийн сургалт Python програмчлалын хэлийг ашиглан тоглоом хөгжүүлэхэд чиглэгдэнэ. Суурь програмчлалын ойлголтууд болон тоглоом бүтээх арга барийг эзэмшинэ.' : 'This summer course for teenagers aged 12-16 focuses on game development using Python programming language. Students will master basic programming concepts and game development techniques.',
      curriculum: [
        language === 'mn' ? 'Python үндэс' : 'Python Basics',
        language === 'mn' ? 'Pygame сан' : 'Pygame Library',
        language === 'mn' ? 'Тоглоомын механик' : 'Game Mechanics',
        language === 'mn' ? 'График ба анимэйшн' : 'Graphics and Animation',
        language === 'mn' ? 'Төгс төсөл' : 'Final Project'
      ],
      tools: ['Python', 'Pygame', 'Visual Studio Code'],
      iconComponent: Code
    },
    {
      id: 3,
      name: 'Electrikid',
      category: 'zuslaan',
      tag: language === 'mn' ? 'Зуслан' : 'Summer',
      tagColor: 'bg-green-500',
      price: '₮850,000',
      description: language === 'mn' ? '9-13 насныханд зориулсан электроникийн анхан шатны сургалт' : 'Electronics beginner course for ages 9-13',
      duration: language === 'mn' ? '5 өдөр' : '5 days',
      age: language === 'mn' ? '9-13 нас' : '9-13 years',
      level: language === 'mn' ? 'Анхан шат' : 'Beginner',
      color: 'from-cyan-400 to-blue-500',
      icon: '⚡',
      details: language === 'mn' ? 'Электроникийн ертөнцийг судлах энэхүү зуслангийн сургалт нь 9-13 насны хүүхдүүдэд зориулсан бөгөөд Arduino платформ ашиглан электроникийн төхөөрөмж бүтээх, програмчлах арга барийг заана.' : 'This summer course exploring the world of electronics is designed for children aged 9-13, teaching how to build and program electronic devices using Arduino platform.',
      curriculum: [
        language === 'mn' ? 'Электроникийн үндэс' : 'Electronics Basics',
        language === 'mn' ? 'Arduino платформ' : 'Arduino Platform',
        language === 'mn' ? 'LED гэрэл удирдах' : 'LED Light Control',
        language === 'mn' ? 'Датчикууд ашиглах' : 'Using Sensors',
        language === 'mn' ? 'Жижиг төхөөрөмж бүтээх' : 'Building Small Devices'
      ],
      tools: ['Arduino', 'LEDs', 'Sensors', 'Breadboard'],
      iconComponent: Zap
    },
    {
      id: 4,
      name: 'Electrikid Crash Course',
      category: 'bogino',
      tag: language === 'mn' ? 'Богино хугацааны' : 'Short-term',
      tagColor: 'bg-orange-500',
      price: '₮350,000',
      description: language === 'mn' ? '9-13 насныханд зориулсан электроникийн тургавчилсан сургалт' : 'Intensive electronics course for ages 9-13',
      duration: language === 'mn' ? '3 өдөр' : '3 days',
      age: language === 'mn' ? '9-13 нас' : '9-13 years',
      level: language === 'mn' ? 'Анхан шат' : 'Beginner',
      color: 'from-purple-400 to-violet-600',
      icon: '🔌',
      details: language === 'mn' ? 'Электроникийн түргэвчилсэн сургалт нь хүүхдүүдэд электроникийн үндсэн ойлголтуудыг хурдан эзэмшүүлэх зорилготой. Arduino ашиглан практик төхөөрөмжүүд бүтээж, электроникийн ертөнцийг судлана.' : 'This intensive electronics course aims to quickly teach children the basic concepts of electronics. Using Arduino, students will build practical devices and explore the world of electronics.',
      curriculum: [
        language === 'mn' ? 'Цахилгаан хэлхээ' : 'Electric Circuits',
        language === 'mn' ? 'Arduino програмчлал' : 'Arduino Programming',
        language === 'mn' ? 'Мотор удирдах' : 'Motor Control',
        language === 'mn' ? 'Дуу авиа үүсгэх' : 'Sound Generation',
        language === 'mn' ? 'Түргэвчилсэн төсөл' : 'Intensive Project'
      ],
      tools: ['Arduino Uno', 'Motors', 'Speakers', 'Basic Components'],
      iconComponent: Zap
    },
    {
      id: 5,
      name: 'Web Design 101',
      category: 'bogino',
      tag: language === 'mn' ? 'Богино хугацааны' : 'Short-term',
      tagColor: 'bg-orange-500',
      price: '₮250,000',
      description: language === 'mn' ? 'Вэб дизайн, HTML/CSS-ийн суурь сургалт' : 'Web design and HTML/CSS basics course',
      duration: language === 'mn' ? '4 долоо хоног (8 цаг)' : '4 weeks (8 hrs)',
      age: language === 'mn' ? '12-16 нас' : '12-16 years',
      level: language === 'mn' ? 'Анхан шат' : 'Beginner',
      color: 'from-orange-400 to-pink-500',
      icon: '🌐',
      details: language === 'mn' ? 'Вэб дизайны ертөнцийг судлах энэхүү сургалт HTML болон CSS-ийн үндсийг зааж, өөрийн веб хуудас бүтээх чадварыг эзэмшүүлнэ. Орчин үеийн веб технологийн суурь мэдлэгийг олгоно.' : 'This course exploring the world of web design teaches the basics of HTML and CSS, enabling students to create their own web pages. Provides fundamental knowledge of modern web technologies.',
      curriculum: [
        language === 'mn' ? 'HTML бүтэц' : 'HTML Structure',
        language === 'mn' ? 'CSS дизайн' : 'CSS Styling',
        language === 'mn' ? 'Responsive дизайн' : 'Responsive Design',
        language === 'mn' ? 'Вэб хуудас бүтээх' : 'Web Page Creation',
        language === 'mn' ? 'Төсөл хөгжүүлэх' : 'Project Development'
      ],
      tools: ['HTML', 'CSS', 'Visual Studio Code', 'Browser DevTools'],
      iconComponent: Code
    },
    {
      id: 6,
      name: 'Python Programmer',
      category: 'bogino',
      tag: language === 'mn' ? 'Богино хугацааны' : 'Short-term',
      tagColor: 'bg-orange-500',
      price: '₮300,000',
      description: language === 'mn' ? 'Python програмчлалын анхан шатны сургалт' : 'Python programming beginner course',
      duration: language === 'mn' ? '6 долоо хоног (12 цаг)' : '6 weeks (12 hrs)',
      age: language === 'mn' ? '11-15 нас' : '11-15 years',
      level: language === 'mn' ? 'Анхан шат' : 'Beginner',
      color: 'from-blue-400 to-cyan-500',
      icon: '💻',
      details: language === 'mn' ? 'Python програмчлалын хэлийг сурах энэхүү сургалт нь анхан шатны суралцагчдад зориулсан бөгөөд програмчлалын үндсэн ойлголтуудыг эзэмшүүлж, практик ур чадварыг хөгжүүлнэ.' : 'This course for learning Python programming language is designed for beginners, teaching fundamental programming concepts and developing practical skills.',
      curriculum: [
        language === 'mn' ? 'Python суулгах' : 'Python Installation',
        language === 'mn' ? 'Хувьсагч ба өгөгдлийн төрөл' : 'Variables and Data Types',
        language === 'mn' ? 'Нөхцөлт үйлдэл ба давталт' : 'Conditionals and Loops',
        language === 'mn' ? 'Функц' : 'Functions',
        language === 'mn' ? 'Жишээ төслүүд' : 'Sample Projects'
      ],
      tools: ['Python', 'IDLE', 'Jupyter Notebook', 'Visual Studio Code'],
      iconComponent: Code
    },
  ];

  const dynamicProgram = programs.find(p => p.id === id);
  const staticCourse = courses.find(c => c.id.toString() === id);

  const course = React.useMemo(() => {
    if (dynamicProgram) {
      return {
        id: dynamicProgram.id,
        name: dynamicProgram.title,
        category: dynamicProgram.category,
        tag: dynamicProgram.category === 'zuslaan' ? (language === 'mn' ? 'Зуслан' : 'Summer') : (language === 'mn' ? 'Богино хугацааны' : 'Short-term'),
        tagColor: dynamicProgram.category === 'zuslaan' ? 'bg-green-500' : 'bg-orange-500',
        price: dynamicProgram.price || '₮850,000',
        description: dynamicProgram.description || '',
        duration: dynamicProgram.duration,
        age: dynamicProgram.ageGroup || (language === 'mn' ? 'Бүх нас' : 'All ages'),
        level: dynamicProgram.level || (language === 'mn' ? 'Анхан шат' : 'Beginner'),
        color: dynamicProgram.color || 'from-blue-400 to-cyan-500',
        icon: dynamicProgram.icon || '💻',
        details: dynamicProgram.description || '',
        curriculum: dynamicProgram.curriculumSummary ? dynamicProgram.curriculumSummary.split(',').map(s => s.trim()) : (language === 'mn' ? ['Танилцуулга', 'Үндсэн ойлголт', 'Практик'] : ['Introduction', 'Core Concepts', 'Practice']),
        tools: dynamicProgram.tools ? dynamicProgram.tools.split(',').map(s => s.trim()) : (language === 'mn' ? ['Компьютер', 'Интернэт'] : ['PC', 'Internet']),
        iconComponent: Code,
        image: dynamicProgram.coverImage
      };
    }
    return staticCourse;
  }, [dynamicProgram, staticCourse, language]);

  if (!course) {
    return (
      <div className={`min-h-screen pt-32 px-4 sm:px-6 flex items-center justify-center ${theme === 'dark' ? 'bg-[#060810] text-white' : 'bg-gray-50 text-black'}`}>
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{language === 'mn' ? 'Сургалт олдсонгүй' : 'Course not found'}</h2>
            <Link to="/programm" className="text-blue-500 hover:underline">{language === 'mn' ? 'Буцах' : 'Go back'}</Link>
        </div>
      </div>
    );
  }

  const IconComponent = course.iconComponent;
  const heroBackgroundByCourseId: Record<string, string> = {
    '1': zuslanBg,
    '2': zerotoheroImage,
    '3': electrikidImage,
    '4': electrikidImage,
  };
  const heroBackgroundImage = (course as any).image || heroBackgroundByCourseId[course.id.toString()];
  const hasHeroBackground = Boolean(heroBackgroundImage);

  return (
    <div className={`min-h-screen pt-32 ${theme === 'dark' ? 'bg-[#060810]' : 'bg-gray-50'}`}>
      {/* Hero Banner */}
      <div 
        className={`relative overflow-hidden ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}
        style={
          hasHeroBackground
            ? {
                backgroundImage: `url(${heroBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 18%'
              }
            : {}
        }
      >
        <div className={`absolute inset-0 ${hasHeroBackground ? 'bg-black/40' : 'bg-[#0ea5e9]/10'}`}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${theme === 'dark' ? 'bg-[#F4B400]/30' : 'bg-[#F4B400]/10'}`}>
                <IconComponent size={48} className={theme === 'dark' ? 'text-[#F4B400]' : 'text-[#F4B400]'} />
              </div>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${hasHeroBackground ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {course.name}
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${hasHeroBackground ? 'text-gray-100' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {course.description}
            </p>
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg ${course.tagColor} text-white`}>
              {course.icon} {course.tag}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/programm"
            className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'text-[#F4B400] hover:bg-[#F4B400]/20' : 'text-[#F4B400] hover:bg-[#F4B400]/10'
            }`}
          >
            <ArrowLeft size={20} />
            {language === 'mn' ? 'Буцах' : 'Back'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Details */}
              <div className={`rounded-2xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-8">
                  <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'mn' ? 'Сургалтын дэлгэрэнгүй' : 'Course Details'}
                  </h2>
                  <p className={`text-base leading-relaxed mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {course.details}
                  </p>

                  {/* Curriculum */}
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'mn' ? 'Хичээлийн хөтөлбөр' : 'Curriculum'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.curriculum.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools Section */}
              <div className={`rounded-2xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-8">
                  <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'mn' ? 'Ашиглах багаж хэрэгслүүд' : 'Tools & Technologies'}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {course.tools.map((tool: string, index: number) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-[#F4B400]/20 text-[#F4B400] border border-[#F4B400]/60'
                            : 'bg-[#F4B400]/10 text-[#F4B400] border border-[#F4B400]/40'
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Info */}
              <div className={`rounded-2xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'mn' ? 'Мэдээлэл' : 'Information'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                      <div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {language === 'mn' ? 'Үргэлжлэх хугацаа' : 'Duration'}
                        </div>
                        <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {course.duration}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                      <div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {language === 'mn' ? 'Насны ангилал' : 'Age Group'}
                        </div>
                        <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {course.age}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                      <div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {language === 'mn' ? 'Түвшин' : 'Level'}
                        </div>
                        <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {course.level}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign size={20} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
                      <div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {language === 'mn' ? 'Үнэ' : 'Price'}
                        </div>
                        <div className={`font-semibold text-lg ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          {course.price}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <div className="mt-6">
                    <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      theme === 'dark'
                        ? 'bg-[#F4B400] hover:bg-[#F4B400]/90 text-white'
                        : 'bg-[#F4B400] hover:bg-[#F4B400]/90 text-white'
                    }`}>
                      {language === 'mn' ? 'Бүртгүүлэх' : 'Register'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className={`rounded-2xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'mn' ? 'Холбоо барих' : 'Contact'}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {language === 'mn' ? 'Имэйл' : 'Email'}
                      </div>
                      <div className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        info@teehackathon.mn
                      </div>
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {language === 'mn' ? 'Утас' : 'Phone'}
                      </div>
                      <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        +976 1234 5678
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramCourseDetail;
