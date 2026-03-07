import { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetail from "./pages/ArticleDetail";
import AdminPage from "./pages/AdminPage";
import { articles } from "./data/articles";

export default function App() {
  const [view, setView] = useState<'home' | 'articles' | 'article-detail' | 'admin'>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#articles' || hash.startsWith('#articles#')) {
        setView('articles');
        const tagMatch = hash.match(/^#articles#(.*)$/);
        if (tagMatch && tagMatch[1]) {
          setSelectedTag(decodeURIComponent(tagMatch[1]));
        } else if (hash === '#articles') {
          // If explicitly navigating to #articles without a tag, clear it? 
          // Or keep it? Usually navigation to base clears others.
          // setSelectedTag(null); 
        }
        window.scrollTo(0, 0);
      } else if (hash === '#admin') {
        setView('admin');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#article-')) {
        const id = hash.replace('#article-', '');
        setSelectedArticleId(id);
        setView('article-detail');
      } else {
        setView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleArticleClick = (id: string) => {
    window.location.hash = `#article-${id}`;
  };

  const handleNavigateToArticles = () => {
    window.location.hash = '#articles';
  };

  const handleNavigateToHome = () => {
    window.location.hash = '';
  };

  const selectedArticle = articles.find(a => a.id === selectedArticleId);

  return (
    <AppProvider>
      <div className="min-h-screen bg-brand-dark dark:bg-brand-dark light:bg-brand-light text-white dark:text-white light:text-black selection:bg-brand-secondary/30 selection:text-brand-secondary transition-colors duration-500">
        {view !== 'admin' && <Header onArticlesClick={handleNavigateToArticles} onHomeClick={handleNavigateToHome} />}

        {view === 'home' && (
          <HomePage />
        )}

        {view === 'articles' && (
          <ArticlesPage
            onArticleClick={handleArticleClick}
            initialTag={selectedTag}
            onTagChange={setSelectedTag}
          />
        )}

        {view === 'article-detail' && selectedArticle && (
          <ArticleDetail
            article={selectedArticle}
            onBack={(tag) => {
              if (typeof tag === 'string') setSelectedTag(tag);
              handleNavigateToArticles();
            }}
          />
        )}

        {view === 'admin' && (
          <AdminPage onBack={handleNavigateToHome} />
        )}

        {view !== 'admin' && <Footer />}
      </div>
    </AppProvider>
  );
}
