
export interface Article {
  id: string;
  title: {
    mn: string;
    en: string;
  };
  excerpt: {
    mn: string;
    en: string;
  };
  content: {
    mn: string;
    en: string;
  };
  date: string;
  author: {
    mn: string;
    en: string;
  };
  image: string;
  category: {
    mn: string;
    en: string;
  };
  readTime: {
    mn: string;
    en: string;
  };
  tags?: string[];
}