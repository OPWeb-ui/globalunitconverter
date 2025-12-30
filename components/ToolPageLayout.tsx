import React, { useEffect } from 'react';
import { ExtendedConverterDef } from '../constants';
import { APP_NAME } from '../constants';
import AvailableConvertersDrawer from './AvailableConvertersDrawer';
import { motion } from 'framer-motion';

interface ToolPageLayoutProps {
  tool: ExtendedConverterDef;
  children: React.ReactNode;
}

const ANIMATION_EASE = [0.16, 1, 0.3, 1];

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({ tool, children }) => {
  useEffect(() => {
    document.title = `${tool.name} | ${APP_NAME}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', tool.metaDescription);
  }, [tool]);

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_240px] gap-8 lg:gap-12 items-start pt-6 md:pt-12 pb-20 px-4 md:px-6">
      
      {/* Main Content Column */}
      <motion.main 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ANIMATION_EASE }}
        className="min-w-0 flex flex-col gap-8 md:gap-10"
      >
        
        {/* Editorial Header */}
        <header className="flex flex-col gap-4 border-b border-border/40 pb-6">
           <div className="flex items-center gap-2 text-textMuted/60">
              {React.cloneElement(tool.icon as React.ReactElement, { size: 16, strokeWidth: 1.5 })}
              <span className="text-[10px] font-bold uppercase tracking-widest">{tool.category} Tool</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-semibold text-textMain tracking-tight leading-none">
             {tool.name}
           </h1>
           <p className="text-base md:text-lg text-textMuted font-normal leading-relaxed max-w-2xl text-balance">
             {tool.aboutText}
           </p>
        </header>

        {/* The Interactive Tool */}
        <section className="w-full">
           {children}
        </section>

        {/* Documentation / Context */}
        <footer className="border-t border-border pt-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <article className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold text-textMain uppercase tracking-wider">Concept</h3>
                    <p className="text-sm text-textMuted leading-6 opacity-90">
                        {tool.detailedContent.whatIsIt}
                    </p>
                </article>
                <article className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold text-textMain uppercase tracking-wider">Application</h3>
                    <p className="text-sm text-textMuted leading-6 opacity-90">
                        {tool.detailedContent.whoIsItFor}
                    </p>
                </article>
            </div>
        </footer>

      </motion.main>

      {/* Sidebar Navigation */}
      <aside className="hidden md:block sticky top-24 pt-1 h-fit">
        <AvailableConvertersDrawer />
      </aside>

      {/* Mobile Navigation Fallback */}
      <div className="md:hidden border-t border-border pt-8 mt-4">
        <h4 className="text-xs font-bold text-textMain uppercase tracking-widest mb-4">More Tools</h4>
        <AvailableConvertersDrawer />
      </div>

    </div>
  );
};

export default ToolPageLayout;