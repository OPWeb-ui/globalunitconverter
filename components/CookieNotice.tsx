
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CookieNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if previously acknowledged
    const isAcknowledged = localStorage.getItem('guc_privacy_acknowledged');
    
    // Only show on root path '/' and if not yet acknowledged
    if (!isAcknowledged && location.pathname === '/') {
      // Small delay to prevent layout thrashing or immediate visual noise
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [location.pathname]);

  const handleDismiss = () => {
    localStorage.setItem('guc_privacy_acknowledged', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border bg-white/95 backdrop-blur-sm shadow-elevation"
        >
          <div className="max-w-[1240px] mx-auto px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
            <p className="text-xs text-textMuted font-medium text-center sm:text-left leading-relaxed">
              Global Unit Convert does not use tracking cookies or ads. This notice is shown for transparency only.
            </p>
            <button
              onClick={handleDismiss}
              className="shrink-0 px-4 py-1.5 bg-textMain text-white text-[11px] font-semibold rounded-md hover:bg-black transition-colors shadow-sm active:scale-95"
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
