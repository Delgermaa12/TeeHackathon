import React from 'react';
import { motion } from 'framer-motion';

interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

export const Masonry: React.FC<MasonryProps> = ({
  items,
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
}) => {
  const getInitialPosition = () => {
    if (animateFrom === 'top') return { opacity: 0, y: -30 };
    if (animateFrom === 'left') return { opacity: 0, x: -30 };
    if (animateFrom === 'right') return { opacity: 0, x: 30 };
    return { opacity: 0, y: 30 };
  };

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {items.map((item, index) => {
        const content = (
          <motion.div
            initial={getInitialPosition()}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration, delay: index * stagger }}
            whileHover={scaleOnHover ? { scale: hoverScale } : undefined}
            className="break-inside-avoid overflow-hidden rounded-[1.5rem] border border-white/10 shadow-xl"
          >
            <img
              src={item.img}
              alt={`gallery-${item.id}`}
              className={`w-full object-cover transition-all duration-500 ${
                blurToFocus ? 'blur-[1px] hover:blur-0' : ''
              }`}
              style={{ height: `${item.height}px` }}
            />
          </motion.div>
        );

        return item.url && item.url !== '#' ? (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            {content}
          </a>
        ) : (
          <div key={item.id} className="block">
            {content}
          </div>
        );
      })}
    </div>
  );
};