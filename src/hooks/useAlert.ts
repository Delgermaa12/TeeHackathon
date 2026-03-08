import { useAlertContext } from '../context/AlertContext';

export const useAlert = () => {
  const { showAlert } = useAlertContext();
  return { showAlert };
};
