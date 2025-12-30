import React, { useState, useRef, useEffect } from 'react';
import { Zap, X } from 'lucide-react';
import QuickConverter from './QuickConverter';

const HeaderQuickButton: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if we are on a desktop-sized screen (Tailwind 'md' breakpoint or higher)
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, []);

  // Manage interactions (Popover closing) - only active when component is mounted on desktop
  useEffect(() => {
    if (!isDesktop || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, isDesktop]);

  // If mobile viewport is detected, do not render any UI or run conversion logic
  if (isDesktop === false || isDesktop === null) {
    return null;
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Desktop-only Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
            flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold transition-all shadow-sm
            ${isOpen 
                ? 'bg-blue-50 border-primary text-primary' 
                : 'bg-white border-border text-textMain hover:bg-gray-50 hover:border-gray-300'
            }
        `}
      >
        <Zap size={16} className={isOpen ? 'fill-current' : ''} />
        <span className="hidden sm:inline">Quick Convert</span>
      </button>

      {/* Popover Panel (Desktop only) */}
      <div 
        className={`
            absolute top-full right-0 mt-3 w-80 bg-white border border-border rounded-xl shadow-xl z-50 p-4
            transform transition-all duration-200 origin-top-right
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
        `}
      >
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-textMain">Quick Converter</h3>
            <button onClick={() => setIsOpen(false)} className="text-textMuted hover:text-textMain">
                <X size={16} />
            </button>
        </div>
        <QuickConverter />
      </div>
    </div>
  );
};

export default HeaderQuickButton;