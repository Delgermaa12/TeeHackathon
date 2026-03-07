import React from 'react';
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';

const Footer = () => {
  const { theme, language } = useAppContext();
  const t = translations[language].footer;

  const courses = [
    'Scratch Pixels',
    'Zero 2 Hero',
    'Electrikid',
    'Web Design 101',
    'Python Programmer',
  ];

  const social = [
    { icon: <Facebook size={18} />, href: '#' },
    { icon: <Instagram size={18} />, href: '#' },
    { icon: <Twitter size={18} />, href: '#' },
    { icon: <Youtube size={18} />, href: '#' },
  ];

  return (
    <footer className={`relative z-10 ${theme === 'dark' ? 'bg-brand-dark border-white/5' : 'bg-brand-light border-black/5'} border-t pt-24 pb-12 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Te<sup className="text-brand-primary">3</sup>
              </span>
              <span className={`text-[10px] uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-white/30' : 'text-black/30'} font-bold ml-2`}>
                Education
              </span>
            </div>
            <p className={`${theme === 'dark' ? 'text-white/40' : 'text-black/40'} text-sm leading-relaxed max-w-xs`}>
              {t.desc}
            </p>
            <div className="flex gap-4">
              {social.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className={`w-10 h-10 rounded-full border ${theme === 'dark' ? 'border-white/10 text-white/40 hover:text-white hover:border-white' : 'border-black/10 text-black/40 hover:text-black hover:border-black'} flex items-center justify-center transition-all`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Courses Column */}
          <div className="space-y-8">
            <h4 className={`text-xs uppercase tracking-[0.3em] font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{t.courses}</h4>
            <ul className="space-y-4">
              {courses.map((course) => (
                <li key={course}>
                  <a href="#" className={`${theme === 'dark' ? 'text-white/40 hover:text-brand-primary' : 'text-black/40 hover:text-brand-primary'} text-sm transition-colors`}>
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8 lg:col-span-2">
            <h4 className={`text-xs uppercase tracking-[0.3em] font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{t.contact}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all`}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className={`${theme === 'dark' ? 'text-white/20' : 'text-black/20'} text-[10px] uppercase tracking-widest font-bold mb-1`}>Phone</p>
                    <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-sm font-medium`}>+976 90806161</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all`}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className={`${theme === 'dark' ? 'text-white/20' : 'text-black/20'} text-[10px] uppercase tracking-widest font-bold mb-1`}>Email</p>
                    <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-sm font-medium`}>info@tee.education</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all`}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className={`${theme === 'dark' ? 'text-white/20' : 'text-black/20'} text-[10px] uppercase tracking-widest font-bold mb-1`}>Hours</p>
                    <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-sm font-medium`}>10:00 - 17:30</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className={`${theme === 'dark' ? 'text-white/20' : 'text-black/20'} text-[10px] uppercase tracking-widest font-bold mb-1`}>Location</p>
                    <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-sm font-medium leading-relaxed`}>
                      СБД, 6-р хороо, СУИС-ийн урд Gem Castle 15 давхарт 1501 тоот
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-12 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} flex flex-col md:flex-row justify-between items-center gap-8`}>
          <p className={`${theme === 'dark' ? 'text-white/20' : 'text-black/20'} text-[10px] uppercase tracking-widest font-bold`}>
            {t.copyright}
          </p>
          <div className="flex gap-8">
            <a href="#" className={`${theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-black/20 hover:text-black'} text-[10px] uppercase tracking-widest font-bold transition-colors`}>{t.privacy}</a>
            <a href="#" className={`${theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-black/20 hover:text-black'} text-[10px] uppercase tracking-widest font-bold transition-colors`}>{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
