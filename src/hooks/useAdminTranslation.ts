import { useAppContext } from '../context/AppContext';
import { adminTranslations } from '../translations/admin';

export const useAdminTranslation = () => {
  const { language } = useAppContext();
  return adminTranslations[language] || adminTranslations.mn;
};
