
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, side = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleFocus = () => setIsVisible(true);
  const handleBlur = () => setIsVisible(false);

  // Position logic
  const yOffset = side === 'top' ? 4 : -4;
  const placementClasses = side === 'top' 
    ? 'bottom-full mb-2' 
    : 'top-full mt-2';
  
  const arrowClasses = side === 'top'
    ? '-bottom-1 border-b border-r'
    : '-top-1 border-t border-l';

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: yOffset, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: yOffset, scale: 0.96 }}
            transition={{ duration: 0.15, delay: 0.2, ease: "easeOut" }}
            className={`
              absolute z-50 px-2.5 py-1.5 
              text-[10px] font-semibold tracking-wide text-textMain 
              bg-white border border-border rounded-lg shadow-elevation 
              whitespace-nowrap pointer-events-none left-1/2 -translate-x-1/2
              ${placementClasses}
            `}
          >
            {content}
            {/* Arrow */}
            <div className={`absolute w-2 h-2 bg-white border-border rotate-45 left-1/2 -translate-x-1/2 ${arrowClasses}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
