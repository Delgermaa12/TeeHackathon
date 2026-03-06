import React from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  const { theme, language } = useAppContext();
  const t = translations[language].footer;

  const socialLinks = [
    { icon: <Facebook size={16} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={16} />, href: '#', label: 'Instagram' },
    { icon: <Youtube size={16} />, href: '#', label: 'YouTube' },
    { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
  ];

  const pages = [
    { name: language === 'mn' ? 'Нүүр' : 'Home', href: '#' },
    { name: language === 'mn' ? 'Хөтөлбөр' : 'Program', href: '#' },
    { name: language === 'mn' ? 'Сургалтууд' : 'Courses', href: '#' },
    { name: language === 'mn' ? 'Багш нар' : 'Teachers', href: '#' },
    { name: language === 'mn' ? 'Нийтлэл' : 'Articles', href: '#' },
    { name: language === 'mn' ? 'Бидний тухай' : 'About', href: '#' },
  ];

  const courses = [
    'Scratch Pixels',
    'Zero 2 Hero',
    'Electrikid',
    'Web Design 101',
    'Python Programmer',
  ];

  const contactInfo = [
    { icon: <Phone size={16} />, value: '+976 90806161', href: 'tel:+97690806161' },
    { icon: <Mail size={16} />, value: 'info@tee.education', href: 'mailto:info@tee.education' },
    { icon: <Clock size={16} />, value: language === 'mn' ? '10:00 – 17:30' : '10:00 AM – 5:30 PM' },
    { icon: <MapPin size={16} />, value: language === 'mn' 
      ? 'СБД, 6-р хороо, Gem Castle 15 давхар, 1501 тоот' 
      : 'SBD, 6th khoroo, Gem Castle 15th floor, Suite 1501' 
    },
  ];

  return (
    <footer 
      className={`relative z-10 transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-[#0A0D18] border-[rgba(255,255,255,0.08)]' 
          : 'bg-white border-[rgba(0,0,0,0.08)]'
      } border-t`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-[var(--border)]">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <span className="font-['Bebas_Neue'] text-4xl tracking-[6px] text-[var(--text)]">
                TEE
              </span>
            </div>
            <p className="text-[0.84rem] font-light text-[var(--muted)] leading-relaxed max-w-[240px]">
              {language === 'mn' 
                ? 'The Essential Engineering Education — Боловсролыг инженерчилсэн Монголын №1 дижитал технологийн сургууль.'
                : 'The Essential Engineering Education — Mongolia\'s #1 digital technology school that engineers education.'}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all duration-200 border ${
                    theme === 'dark'
                      ? 'bg-[rgba(255,255,255,0.04)] text-[var(--muted)] border-[var(--border)] hover:border-[#00CFFF] hover:text-white hover:-translate-y-1'
                      : 'bg-[rgba(0,0,0,0.04)] text-[var(--muted)] border-[var(--border)] hover:border-[#F5C200] hover:text-black hover:-translate-y-1'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Pages Column */}
          <div>
            <h3 className={`font-['Syne'] text-[0.63rem] font-bold tracking-[3px] uppercase mb-5 ${
              theme === 'dark' ? 'text-[#00CFFF]' : 'text-[#F5C200]'
            }`}>
              {language === 'mn' ? 'Хуудсууд' : 'Pages'}
            </h3>
            <ul className="space-y-2.5">
              {pages.map((page, i) => (
                <li key={i}>
                  <a
                    href={page.href}
                    className="text-[0.84rem] font-light text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Column */}
          <div>
            <h3 className={`font-['Syne'] text-[0.63rem] font-bold tracking-[3px] uppercase mb-5 ${
              theme === 'dark' ? 'text-[#00CFFF]' : 'text-[#F5C200]'
            }`}>
              {language === 'mn' ? 'Сургалтууд' : 'Courses'}
            </h3>
            <ul className="space-y-2.5">
              {courses.map((course, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-[0.84rem] font-light text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className={`font-['Syne'] text-[0.63rem] font-bold tracking-[3px] uppercase mb-5 ${
              theme === 'dark' ? 'text-[#00CFFF]' : 'text-[#F5C200]'
            }`}>
              {language === 'mn' ? 'Холбоо барих' : 'Contact'}
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-md flex items-center justify-center text-xs flex-shrink-0 ${
                    theme === 'dark'
                      ? 'bg-[rgba(0,207,255,0.08)] border border-[rgba(0,207,255,0.14)] text-[#00CFFF]'
                      : 'bg-[rgba(245,194,0,0.1)] border border-[rgba(245,194,0,0.22)] text-[#F5C200]'
                  }`}>
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[0.82rem] font-light text-[var(--muted)] hover:text-[var(--text)] transition-colors break-words"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-[0.82rem] font-light text-[var(--muted)] break-words">
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <span className="text-[0.74rem] text-[var(--muted)] opacity-35">
            © 2026 TEE · The Essential Engineering Education · {language === 'mn' ? 'Боловсролыг инженерчлэв.' : 'Engineering Education.'}
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[0.74rem] text-[var(--muted)] opacity-40 hover:opacity-80 transition-opacity"
            >
              {language === 'mn' ? 'Нууцлалын бодлого' : 'Privacy Policy'}
            </a>
            <a
              href="#"
              className="text-[0.74rem] text-[var(--muted)] opacity-40 hover:opacity-80 transition-opacity"
            >
              {language === 'mn' ? 'Үйлчилгээний нөхцөл' : 'Terms of Service'}
            </a>
            <a
              href="#"
              className={`text-[0.74rem] flex items-center gap-1.5 transition-opacity ${
                theme === 'dark'
                  ? 'text-[#00CFFF] opacity-60 hover:opacity-100'
                  : 'text-[#F5C200] opacity-60 hover:opacity-100'
              }`}
            >
              <span>🔐</span>
              {language === 'mn' ? 'Нэвтрэх (Багш/Админ)' : 'Login (Staff/Admin)'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;