import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import About from "./pages/AboutUs";
import Programm from "./pages/Program";
import Staff from "./pages/Staff";
import StaffDetail from "./pages/StaffDetail";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetail from "./pages/ArticleDetail";
import AdminPage from "./pages/AdminPage";
import ProgramCourseDetail from "./pages/ProgramCourseDetail";
import ProgramGradeDetail from "./pages/ProgramGradeDetail";
import TeeChatbot from "./chatbot";

function AppLayout() {
  const location = useLocation();
  const { theme } = useAppContext();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = theme;
  }, [theme]);

  const isAdminPage = location.pathname === "/admin";

  return (
    <div className="min-h-screen bg-brand-dark dark:bg-brand-dark light:bg-brand-light text-white dark:text-white light:text-black selection:bg-brand-secondary/30 selection:text-brand-secondary transition-colors duration-500">
      
      {/* Header */}
      {!isAdminPage && <Header />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/programm" element={<Programm />} />
        <Route path="/programm/course/:id" element={<ProgramCourseDetail />} />
        <Route path="/programm/grade/:id" element={<ProgramGradeDetail />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/:id" element={<StaffDetail />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      {/* Chatbot */}
      {!isAdminPage && <TeeChatbot />}

      {/* Footer */}
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}