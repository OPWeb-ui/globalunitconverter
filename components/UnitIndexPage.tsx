
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UNIT_TOOLS, APP_NAME } from '../constants';
import { motion } from 'framer-motion';

const UnitIndexPage: React.FC = () => {
  useEffect(() => { document.title = `Unit Encyclopedia | ${APP_NAME}`; }, []);

  return (
    <motion.div 
       initial={{ opacity: 0, y: 12 }} 
       animate={{ opacity: 1, y: 0 }} 
       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
       className="max-w-4xl mx-auto py-12 px-4 md:px-6"
    >
       <header className="mb-16">
          <h1 className="text-3xl font-bold text-textMain mb-4 tracking-tight">Unit Encyclopedia</h1>
          <p className="text-lg text-textMuted font-normal max-w-2xl leading-relaxed">
            A curated reference for international measurement standards. 
            Browse definitions, histories, and conversion factors.
          </p>
       </header>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {UNIT_TOOLS.map(category => (
             <div key={category.id} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                   <span className="text-textMuted">{React.cloneElement(category.icon as React.ReactElement, { size: 16 })}</span>
                   <h2 className="text-sm font-bold text-textMain uppercase tracking-wider">{category.name}</h2>
                </div>
                <ul className="flex flex-col gap-2">
                   {category.units.map(u => (
                      <li key={u.id}>
                         <Link 
                           to={`/unit/${u.id}`} 
                           className="text-[15px] text-textMain/80 hover:text-primary transition-colors flex justify-between group"
                         >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">{u.name}</span>
                            <span className="text-xs font-mono text-textMuted/40">{u.symbol}</span>
                         </Link>
                      </li>
                   ))}
                </ul>
             </div>
          ))}
       </div>
    </motion.div>
  );
};

export default UnitIndexPage;
