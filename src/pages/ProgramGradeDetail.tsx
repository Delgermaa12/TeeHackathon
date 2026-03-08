import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, CheckCircle, Clock, Users, Award, BookOpen, Code, Palette, Smartphone, Brain, Zap } from 'lucide-react';

const ProgramGradeDetail = () => {
  const { grade } = useParams();
  const { theme, language } = useAppContext();

  const gradePrograms = [
    {
      grade: '3',
      title: language === 'mn' ? '3 дугаар ангийн хөтөлбөр' : '3rd Grade Program',
      description: language === 'mn' ? 'Компьютерын үндэс, алгоритм, програмчлалын анхан шатыг сурах' : 'Learn computer basics, algorithms, and programming fundamentals',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Анхан шат' : 'Beginner',
      age: language === 'mn' ? '8-9 нас' : '8-9 years',
      details: language === 'mn' ? 'Энэхүү хөтөлбөр нь 3 дугаар ангийн сурагчдад зориулсан бөгөөд компьютерын үндсийг танилцуулж, алгоритмын сэтгэлгээг хөгжүүлнэ. Scratch програмчлалын хэлийг ашиглан тоглоом бүтээх, логик бодлого шийдэх зэрэг үйл ажиллагаануудыг хамарна.' : 'This program is designed for 3rd graders, introducing computer basics and developing algorithmic thinking. It includes activities like creating games using Scratch programming language and solving logic problems.',
      curriculum: [
        language === 'mn' ? 'Компьютерын үндэс' : 'Computer Basics',
        language === 'mn' ? 'Алгоритмын сэтгэлгээ' : 'Algorithmic Thinking',
        language === 'mn' ? 'Scratch програмчлал' : 'Scratch Programming',
        language === 'mn' ? 'Логик бодлого' : 'Logic Problems',
        language === 'mn' ? 'Тоглоом бүтээх' : 'Game Development'
      ],
      tools: ['Scratch', 'Visual Programming'],
      icon: BookOpen
    },
    {
      grade: '4',
      title: language === 'mn' ? '4 дүгээр ангийн хөтөлбөр' : '4th Grade Program',
      description: language === 'mn' ? 'Python програмчлал, логик сэтгэлгээг хөгжүүлэх' : 'Python programming and logical thinking development',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Анхан шат' : 'Beginner',
      age: language === 'mn' ? '9-10 нас' : '9-10 years',
      details: language === 'mn' ? '4 дүгээр ангийн сурагчдад зориулсан энэхүү хөтөлбөр Python програмчлалын үндсийг зааж, логик сэтгэлгээг хөгжүүлнэ. Хувьсагч, давталт, нөхцөлт үйлдлүүдийг сурах болно.' : 'This program for 4th graders teaches Python programming basics and develops logical thinking. Students will learn about variables, loops, and conditional statements.',
      curriculum: [
        language === 'mn' ? 'Python үндэс' : 'Python Basics',
        language === 'mn' ? 'Хувьсагч ба өгөгдлийн төрөл' : 'Variables and Data Types',
        language === 'mn' ? 'Давталт ба нөхцөл' : 'Loops and Conditions',
        language === 'mn' ? 'Функц' : 'Functions',
        language === 'mn' ? 'Жишээ төслүүд' : 'Sample Projects'
      ],
      tools: ['Python', 'IDLE', 'Visual Studio Code'],
      icon: Code
    },
    {
      grade: '5',
      title: language === 'mn' ? '5-р ангийн хөтөлбөр' : '5th Grade Program',
      description: language === 'mn' ? 'Вэб хөгжүүлэлт, HTML, CSS, JavaScript сурах' : 'Web development, HTML, CSS, JavaScript learning',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'суурь шат' : 'Foundation',
      age: language === 'mn' ? '10-11 нас' : '10-11 years',
      details: language === 'mn' ? '5 дугаар ангийн сурагчдад зориулсан веб хөгжүүлэлтийн суурь хөтөлбөр. HTML, CSS ашиглан веб хуудас бүтээх, JavaScript-ээр интерактив элемент нэмэх зэрэг ур чадваруудыг эзэмшинэ.' : 'Web development foundation program for 5th graders. Learn to create web pages using HTML and CSS, and add interactive elements with JavaScript.',
      curriculum: [
        language === 'mn' ? 'HTML үндэс' : 'HTML Basics',
        language === 'mn' ? 'CSS дизайн' : 'CSS Styling',
        language === 'mn' ? 'JavaScript интерактив' : 'JavaScript Interactivity',
        language === 'mn' ? 'Вэб хуудас бүтээх' : 'Web Page Creation',
        language === 'mn' ? 'Responsive дизайн' : 'Responsive Design'
      ],
      tools: ['HTML', 'CSS', 'JavaScript', 'Visual Studio Code'],
      icon: Code
    },
    {
      grade: '6',
      title: language === 'mn' ? '6-р ангийн хөтөлбөр' : '6th Grade Program',
      description: language === 'mn' ? 'Дизайн ба UI/UX үндэс, бүтээлч сэтгэлгээ' : 'Design and UI/UX basics, creative thinking',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Дунд шат' : 'Intermediate',
      age: language === 'mn' ? '11-12 нас' : '11-12 years',
      details: language === 'mn' ? 'Дизайн болон UI/UX-ийн үндсийг зааж, бүтээлч сэтгэлгээг хөгжүүлэх хөтөлбөр. График дизайн, интерфейсийн дизайн, хэрэглэгчийн туршлага зэрэг сэдвүүдийг хамарна.' : 'Program teaching design and UI/UX basics while developing creative thinking. Covers graphic design, interface design, and user experience topics.',
      curriculum: [
        language === 'mn' ? 'График дизайн' : 'Graphic Design',
        language === 'mn' ? 'UI/UX үндэс' : 'UI/UX Basics',
        language === 'mn' ? 'Өнгө ба композиц' : 'Color and Composition',
        language === 'mn' ? 'Интерфейс дизайн' : 'Interface Design',
        language === 'mn' ? 'Бүтээлч сэтгэлгээ' : 'Creative Thinking'
      ],
      tools: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
      icon: Palette
    },
    {
      grade: '7',
      title: language === 'mn' ? '7-р ангийн хөтөлбөр' : '7th Grade Program',
      description: language === 'mn' ? 'Мобайл хэрэгслэлийн хөгжүүлэлт ба дизайн' : 'Mobile app development and design',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Дунд шат' : 'Intermediate',
      age: language === 'mn' ? '12-13 нас' : '12-13 years',
      details: language === 'mn' ? 'Мобайл апп хөгжүүлэлт болон дизайны үндсийг заах хөтөлбөр. Android/iOS апп бүтээх, мобайл интерфейс дизайн зэрэг ур чадваруудыг эзэмшинэ.' : 'Program teaching mobile app development and design basics. Learn to create Android/iOS apps and design mobile interfaces.',
      curriculum: [
        language === 'mn' ? 'Мобайл апп дизайн' : 'Mobile App Design',
        language === 'mn' ? 'Android хөгжүүлэлт' : 'Android Development',
        language === 'mn' ? 'iOS хөгжүүлэлт' : 'iOS Development',
        language === 'mn' ? 'UI компонент' : 'UI Components',
        language === 'mn' ? 'Апп туршилт' : 'App Testing'
      ],
      tools: ['Android Studio', 'Xcode', 'React Native', 'Flutter'],
      icon: Smartphone
    },
    {
      grade: '8',
      title: language === 'mn' ? '8-р ангийн хөтөлбөр' : '8th Grade Program',
      description: language === 'mn' ? 'Өндөрлөг програмчлал, өгөгдлийн бүтэц' : 'Advanced programming, data structures',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Ахисан шат' : 'Advanced',
      age: language === 'mn' ? '13-14 нас' : '13-14 years',
      details: language === 'mn' ? 'Өндөр түвшний програмчлал болон өгөгдлийн бүтцийн үндсийг заах хөтөлбөр. Алгоритм, өгөгдлийн бүтэц, объект хандалтат програмчлал зэрэг сэдвүүдийг гүнзгийрүүлэн судлана.' : 'Advanced programming and data structures program. Deepens knowledge in algorithms, data structures, and object-oriented programming.',
      curriculum: [
        language === 'mn' ? 'Алгоритм' : 'Algorithms',
        language === 'mn' ? 'Өгөгдлийн бүтэц' : 'Data Structures',
        language === 'mn' ? 'Объект хандалтат програмчлал' : 'Object-Oriented Programming',
        language === 'mn' ? 'Бие даалт төслүүд' : 'Independent Projects',
        language === 'mn' ? 'Кодын оптимизац' : 'Code Optimization'
      ],
      tools: ['Python', 'Java', 'C++', 'Git', 'Visual Studio Code'],
      icon: Brain
    },
    {
      grade: '9',
      title: language === 'mn' ? '9-р ангийн хөтөлбөр' : '9th Grade Program',
      description: language === 'mn' ? 'AI, машин сургалт ба системүүдийн зарчим' : 'AI, machine learning and systems principles',
      duration: language === 'mn' ? '9 сар' : '9 months',
      level: language === 'mn' ? 'Ахисан шат' : 'Advanced',
      age: language === 'mn' ? '14-15 нас' : '14-15 years',
      details: language === 'mn' ? 'Хиймэл оюун ухаан, машин сургалт, системийн зарчмуудыг заах ахисан түвшний хөтөлбөр. AI-ийн үндэс, машин сургалтын алгоритм, системийн дизайн зэрэг сэдвүүдийг хамарна.' : 'Advanced program covering AI, machine learning, and systems principles. Includes AI basics, machine learning algorithms, and system design.',
      curriculum: [
        language === 'mn' ? 'AI үндэс' : 'AI Basics',
        language === 'mn' ? 'Машин сургалт' : 'Machine Learning',
        language === 'mn' ? 'Өгөгдлийн шинжилгээ' : 'Data Analysis',
        language === 'mn' ? 'Системийн дизайн' : 'System Design',
        language === 'mn' ? 'AI төслүүд' : 'AI Projects'
      ],
      tools: ['Python', 'TensorFlow', 'Pandas', 'Jupyter', 'Scikit-learn'],
      icon: Zap
    },
  ];

  const program = gradePrograms.find(p => p.grade === grade);

  if (!program) {
    return <div>Program not found</div>;
  }

  const IconComponent = program.icon;

  return (
    <div className={`min-h-screen pt-32 ${theme === 'dark' ? 'bg-[#060810]' : 'bg-gray-50'}`}>
      {/* Hero Banner */}
      <div className={`relative overflow-hidden ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                <IconComponent size={48} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
              </div>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {program.title}
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {program.description}
            </p>
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
              theme === 'dark' ? 'text-blue-400 hover:bg-blue-900/30' : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            <ArrowLeft size={20} />
            {language === 'mn' ? 'Буцах' : 'Back'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Program Details */}
              <div className={`rounded-2xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-8">
                  <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'mn' ? 'Хөтөлбөрийн дэлгэрэнгүй' : 'Program Details'}
                  </h2>
                  <p className={`text-base leading-relaxed mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {program.details}
                  </p>

                  {/* Curriculum */}
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'mn' ? 'Хичээлийн хөтөлбөр' : 'Curriculum'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {program.curriculum.map((item, index) => (
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
                    {program.tools.map((tool, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-blue-900/30 text-blue-300 border border-blue-700'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
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
              {/* Program Info */}
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
                          {program.duration}
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
                          {program.level}
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
                          {program.age}
                        </div>
                      </div>
                    </div>
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

export default ProgramGradeDetail;
