import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import About from "./pages/AboutUs";
import Programm from "./pages/Program";
import Staff from "./pages/Staff";
import StaffDetail from "./pages/StaffDetail";

function AppContent() {
  const { theme } = useAppContext();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-brand-dark text-white"
          : "bg-brand-light text-black"
      } selection:bg-brand-secondary/30 selection:text-brand-secondary`}
    >
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/programm" element={<Programm />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/:id" element={<StaffDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}