import React from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-brand-dark dark:bg-brand-dark light:bg-brand-light text-white dark:text-white light:text-black selection:bg-brand-secondary/30 selection:text-brand-secondary transition-colors duration-500">
        <Header />
        <HomePage />
        <Footer />
      </div>
    </AppProvider>
  );
}
