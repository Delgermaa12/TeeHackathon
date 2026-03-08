import React, { useState } from 'react';
import { Accessibility } from 'lucide-react';
import { AccessibilityModal } from './AccessibilityModal';

export const AccessibilityFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-brand-secondary text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Хүртээмжтэй байдлын тохиргоо"
      >
        <Accessibility size={28} />
      </button>

      <AccessibilityModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
