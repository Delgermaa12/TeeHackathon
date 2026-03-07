import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import About from "./pages/AboutUs";
import Programm from "./pages/Program";
import Staff from "./pages/Staff";
import StaffDetail from "./pages/StaffDetail";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetail from "./pages/ArticleDetail";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-brand-dark dark:bg-brand-dark light:bg-brand-light text-white dark:text-white light:text-black selection:bg-brand-secondary/30 selection:text-brand-secondary transition-colors duration-500">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/programm" element={<Programm />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/staff/:id" element={<StaffDetail />} />
  <Route path="/articles" element={<ArticlesPage />} />
  <Route path="/articles/:id" element={<ArticleDetail />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}