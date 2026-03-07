import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Program from './pages/Program';
import Aboutus from './pages/AboutUs';
import Staff from './pages/Staff';
import StaffDetail from './pages/StaffDetail';
import { AmbientDecorations } from './components/AmbientDecorations';
import './index.css';


function AppContent() {
  const { theme } = useAppContext();

  useEffect(() => {
    // HTML болон body-д data-theme attribute тохируулах
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme; // body-д class нэмэх
    
    // IntroAnimation-д зориулж global variable
    if (typeof window !== 'undefined') {
      window.__theme = theme;
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#060810]' : 'bg-white'} text-[var(--text-primary)] transition-colors duration-500`}>
      <AmbientDecorations />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/:id" element={<StaffDetail />} />
        <Route path="/program" element={<Program />} />
        <Route path="/about" element={<Aboutus />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;