
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { APP_NAME, ALL_CONVERTERS } from '../constants';
import { UNIT_WIKI } from '../data/wikiData';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const UnitReferencePage: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  
  const converter = ALL_CONVERTERS.find(c => c.units.some(u => u.id === unitId));
  const basicUnit = converter?.units.find(u => u.id === unitId);
  const wikiData = unitId && UNIT_WIKI[unitId] ? UNIT_WIKI[unitId] : null;

  useEffect(() => {
    if (basicUnit) document.title = `${basicUnit.name} - Reference | ${APP_NAME}`;
  }, [basicUnit]);

  if (!basicUnit || !converter) return <div className="p-20 text-center">Unit not found</div>;

  const content = {
    definition: wikiData?.definition || `${basicUnit.name} (${basicUnit.symbol}) is a unit of ${converter.name.toLowerCase()}.`,
    history: wikiData?.history || `The ${basicUnit.name} is a standard unit in the ${converter.name} system.`,
    usage: wikiData?.usage || `Commonly used in fields requiring precise ${converter.name.toLowerCase()} calculations.`,
    facts: wikiData?.facts || [{ label: 'Symbol', value: basicUnit.symbol }, { label: 'System', value: 'Standard' }]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto py-12 px-4 md:px-6"
    >
      <Link to="/units" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-textMuted hover:text-textMain mb-8 transition-colors">
        <ArrowLeft size={12} /> Back to Encyclopedia
      </Link>

      <header className="mb-12 border-b border-border pb-8">
        <div className="flex items-baseline gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-textMain tracking-tight">{basicUnit.name}</h1>
            <span className="text-2xl text-textMuted font-mono font-light">{basicUnit.symbol}</span>
        </div>
        <p className="text-xl text-textMain/80 font-serif leading-relaxed italic">
          {content.definition}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
         <main className="flex flex-col gap-10 text-base leading-7 text-textMain/90">
            <section>
               <h3 className="text-sm font-bold uppercase tracking-wider text-textMuted mb-3">History & Origin</h3>
               <p>{content.history}</p>
            </section>
            <section>
               <h3 className="text-sm font-bold uppercase tracking-wider text-textMuted mb-3">Usage</h3>
               <p>{content.usage}</p>
            </section>
         </main>

         <aside className="flex flex-col gap-6">
            <div className="bg-surfaceHighlight/30 p-5 rounded-lg border border-border/60">
               <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-4">Quick Facts</h4>
               <dl className="flex flex-col gap-3">
                  {content.facts.map((f, i) => (
                     <div key={i} className="flex justify-between text-sm">
                        <dt className="text-textMuted">{f.label}</dt>
                        <dd className="font-semibold text-textMain">{f.value}</dd>
                     </div>
                  ))}
                  <div className="flex justify-between text-sm">
                        <dt className="text-textMuted">Type</dt>
                        <dd className="font-semibold text-textMain">{converter.name}</dd>
                  </div>
               </dl>
            </div>
            
            <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted">Related Units</h4>
                <ul className="flex flex-col gap-1">
                   {converter.units.filter(u => u.id !== basicUnit.id).slice(0, 4).map(u => (
                      <li key={u.id}>
                         <Link to={`/unit/${u.id}`} className="text-sm text-primary hover:underline">{u.name}</Link>
                      </li>
                   ))}
                </ul>
            </div>
         </aside>
      </div>

    </motion.div>
  );
};

export default UnitReferencePage;
