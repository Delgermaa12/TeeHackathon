import React from 'react';
import { useAlertContext, type AlertType } from '../context/AlertContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getAlertIcon = (type: AlertType) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'info':
    default:
      return <Info className="w-5 h-5 text-blue-500" />;
  }
};

const getAlertStyles = (type: AlertType, theme: string) => {
  const base = "flex items-center justify-between p-4 mb-4 border rounded-xl shadow-lg";
  if (theme === 'dark') {
    switch (type) {
      case 'success': return `${base} bg-green-950/40 border-green-500/30 text-green-100`;
      case 'error': return `${base} bg-red-950/40 border-red-500/30 text-red-100`;
      case 'warning': return `${base} bg-yellow-950/40 border-yellow-500/30 text-yellow-100`;
      case 'info':
      default: return `${base} bg-blue-950/40 border-blue-500/30 text-blue-100`;
    }
  } else {
    switch (type) {
      case 'success': return `${base} bg-green-50 border-green-200 text-green-800`;
      case 'error': return `${base} bg-red-50 border-red-200 text-red-800`;
      case 'warning': return `${base} bg-yellow-50 border-yellow-200 text-yellow-800`;
      case 'info':
      default: return `${base} bg-blue-50 border-blue-200 text-blue-800`;
    }
  }
};

export const AlertContainer: React.FC = () => {
  const { alerts, removeAlert } = useAlertContext();
  
  // A simple hack to get current theme without complex prop drilling, 
  // since this will be rendered at root level, we can check the document element class
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full md:w-auto">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={getAlertStyles(alert.type, isDark ? 'dark' : 'light')}
          >
            <div className="flex items-center gap-3">
              {getAlertIcon(alert.type)}
              <p className="text-sm font-medium">{alert.message}</p>
            </div>
            <button
              onClick={() => removeAlert(alert.id)}
              className="ml-4 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
