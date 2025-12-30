
import React from 'react';
import { NavLink } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';

const Logo = () => (
  <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 group select-none">
    <div className="border border-border/60 bg-white rounded-md px-2 py-0.5 shadow-sm">
      <span className="font-semibold text-sm text-textMain tracking-tight">
        GUC
      </span>
    </div>
  </NavLink>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textMain selection:bg-gray-200 selection:text-textMain">
      
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border h-14 flex items-center">
        <div className="max-w-[1240px] mx-auto w-full px-4 md:px-6 relative h-full flex items-center justify-between">
          
          {/* Left: Logo */}
          <div className="flex items-center justify-start min-w-[60px]">
            <Logo />
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-[420px] mx-auto px-4">
            <GlobalSearch />
          </div>

          {/* Right: Spacer for visual balance (Desktop only) */}
          <div className="hidden md:flex min-w-[60px]" aria-hidden="true" />

        </div>
      </header>

      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 md:px-6 py-8 md:py-12">
        {children}
      </main>

      <footer className="bg-white border-t border-border py-8 md:py-10 mt-auto">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-textMuted/60">
            <div className="flex gap-6 flex-wrap justify-center">
                <NavLink to="/units" className="hover:text-textMain transition-colors">Encyclopedia</NavLink>
                <NavLink to="/help" className="hover:text-textMain transition-colors">Help</NavLink>
                <NavLink to="/privacy" className="hover:text-textMain transition-colors">Privacy</NavLink>
                <NavLink to="/terms" className="hover:text-textMain transition-colors">Terms</NavLink>
                <NavLink to="/about" className="hover:text-textMain transition-colors">About</NavLink>
            </div>
            <div className="font-semibold text-center md:text-right">Global Unit Convert &copy; {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
