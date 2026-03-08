import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'grayscale';

export interface AccessibilitySettings {
  highContrast: boolean;
  highlightLinks: boolean;
  largeCursor: boolean;
  largeText: boolean;
  letterSpacing: boolean;
  headingSpacing: boolean;
  invertColors: boolean;
  colorBlind: ColorBlindMode;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  toggleSetting: (key: keyof Omit<AccessibilitySettings, 'colorBlind'>) => void;
  setColorBlind: (mode: ColorBlindMode) => void;
  resetAll: () => void;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  highlightLinks: false,
  largeCursor: false,
  largeText: false,
  letterSpacing: false,
  headingSpacing: false,
  invertColors: false,
  colorBlind: 'none',
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('a11y_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('a11y_settings', JSON.stringify(settings));

    const html = document.documentElement;

    // Remove existing a11y classes
    const classesToRemove = [
        'a11y-high-contrast', 'a11y-highlight-links', 'a11y-large-cursor', 
        'a11y-large-text', 'a11y-letter-spacing', 'a11y-heading-spacing',
        'a11y-invert-colors',
        'a11y-protanopia', 'a11y-deuteranopia', 'a11y-tritanopia', 'a11y-grayscale'
    ];
    html.classList.remove(...classesToRemove);

    if (settings.highContrast) html.classList.add('a11y-high-contrast');
    if (settings.highlightLinks) html.classList.add('a11y-highlight-links');
    if (settings.largeCursor) html.classList.add('a11y-large-cursor');
    if (settings.largeText) html.classList.add('a11y-large-text');
    if (settings.letterSpacing) html.classList.add('a11y-letter-spacing');
    if (settings.headingSpacing) html.classList.add('a11y-heading-spacing');
    if (settings.invertColors) html.classList.add('a11y-invert-colors');
    
    if (settings.colorBlind !== 'none') {
        html.classList.add(`a11y-${settings.colorBlind}`);
    }
  }, [settings]);

  const toggleSetting = (key: keyof Omit<AccessibilitySettings, 'colorBlind'>) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setColorBlind = (mode: ColorBlindMode) => {
    setSettings((prev) => ({ ...prev, colorBlind: mode }));
  };

  const resetAll = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider value={{ settings, toggleSetting, setColorBlind, resetAll }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
