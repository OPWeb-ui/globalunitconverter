import React, { useState } from 'react';
import { ExtendedConverterDef } from '../../constants';
import ToolPageLayout from '../ToolPageLayout';
import { Clock, Calendar, ArrowRight, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Tool 1: Date Difference ---
export const DateDifferenceTool: React.FC<{ tool: ExtendedConverterDef }> = ({ tool }) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const diffResult = React.useMemo(() => {
    if (!startDate || !endDate) return null;
    const s = new Date(startDate);
    const e = new Date(endDate);
    s.setHours(0,0,0,0); e.setHours(0,0,0,0); // Normalizing hours
    
    const diffTime = Math.abs(e.getTime() - s.getTime());
    const totalDays = Math.ceil(diffTime / (86400000));
    
    let d1 = s < e ? s : e;
    let d2 = s < e ? e : s;
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();
    if (days < 0) { months--; days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    return { totalDays, years, months, days };
  }, [startDate, endDate]);

  return (
    <ToolPageLayout tool={tool}>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
           {/* Inputs Panel */}
           <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-center gap-6">
               <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Start Date</label>
                   <div className="relative">
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={e => setStartDate(e.target.value)} 
                            className="w-full bg-surfaceHighlight/30 border border-border rounded-lg px-3 py-2.5 text-lg font-medium text-textMain outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all" 
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" size={16} />
                   </div>
               </div>
               
               <div className="flex justify-center text-border/60">
                    <ArrowRight size={20} className="rotate-90 lg:rotate-0" />
               </div>

               <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">End Date</label>
                   <div className="relative">
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={e => setEndDate(e.target.value)} 
                            className="w-full bg-surfaceHighlight/30 border border-border rounded-lg px-3 py-2.5 text-lg font-medium text-textMain outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all" 
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" size={16} />
                   </div>
               </div>
           </div>

           {/* Result Panel */}
           <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center gap-4 min-h-[200px] lg:min-h-0">
               {diffResult ? (
                   <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-3"
                   >
                       <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-100 px-2 py-1 rounded">Duration</span>
                       <div className="text-5xl md:text-6xl font-bold text-textMain tracking-tight tabular-nums">
                           {diffResult.totalDays}
                           <span className="text-xl md:text-2xl font-medium text-textMuted ml-2">days</span>
                       </div>
                       
                       {(diffResult.years > 0 || diffResult.months > 0) && (
                           <div className="flex flex-wrap justify-center gap-2 mt-2 pt-4 border-t border-purple-200/50">
                               {diffResult.years > 0 && <span className="bg-white border border-purple-100 px-3 py-1 rounded-md text-sm font-semibold shadow-sm">{diffResult.years}y</span>}
                               {diffResult.months > 0 && <span className="bg-white border border-purple-100 px-3 py-1 rounded-md text-sm font-semibold shadow-sm">{diffResult.months}m</span>}
                               <span className="bg-white border border-purple-100 px-3 py-1 rounded-md text-sm font-semibold shadow-sm">{diffResult.days}d</span>
                           </div>
                       )}
                   </motion.div>
               ) : (
                   <span className="text-textMuted text-sm">Select dates to calculate difference</span>
               )}
           </div>
       </div>
    </ToolPageLayout>
  );
};

// --- Tool 2: Days From Now ---
export const DaysFromNowTool: React.FC<{ tool: ExtendedConverterDef }> = ({ tool }) => {
  const [days, setDays] = useState('30');
  const [direction, setDirection] = useState<'future' | 'past'>('future');

  const resultDate = React.useMemo(() => {
    const d = parseInt(days);
    if (isNaN(d)) return null;
    const date = new Date();
    date.setDate(date.getDate() + (direction === 'future' ? d : -d));
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }, [days, direction]);

  return (
    <ToolPageLayout tool={tool}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Input Panel */}
            <div className="bg-white border border-border rounded-2xl p-8 shadow-sm flex flex-col justify-center gap-8">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Days Offset</label>
                    <div className="flex items-baseline gap-3">
                        <input 
                            type="number" 
                            value={days} 
                            onChange={e => setDays(e.target.value)} 
                            className="w-32 bg-transparent text-5xl font-light text-textMain border-b-2 border-border focus:border-purple-500 outline-none pb-2 tabular-nums" 
                            placeholder="0" 
                        />
                        <span className="text-xl text-textMuted font-light">days</span>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => setDirection('future')} 
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${direction === 'future' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-border text-textMuted hover:border-purple-300'}`}
                    >
                        From Today
                    </button>
                    <button 
                        onClick={() => setDirection('past')} 
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${direction === 'past' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-border text-textMuted hover:border-purple-300'}`}
                    >
                        Ago
                    </button>
                </div>
            </div>

            {/* Result Panel */}
            <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-8 flex flex-col justify-center items-center text-center gap-2 min-h-[200px] lg:min-h-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">The date will be</span>
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={resultDate}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl font-bold text-textMain leading-tight max-w-[80%]"
                    >
                        {resultDate}
                    </motion.div>
                </AnimatePresence>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    <Calendar size={12} /> Calculated from Today
                </div>
            </div>
        </div>
    </ToolPageLayout>
  );
};

// --- Tool 3: Days From Date ---
export const DaysFromDateTool: React.FC<{ tool: ExtendedConverterDef }> = ({ tool }) => {
    const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
    
    const result = React.useMemo(() => {
        if (!targetDate) return null;
        const target = new Date(targetDate);
        const today = new Date();
        target.setHours(0,0,0,0); today.setHours(0,0,0,0);
        return Math.ceil((target.getTime() - today.getTime()) / 86400000);
    }, [targetDate]);

    const isPast = result !== null && result < 0;
    const absResult = result !== null ? Math.abs(result) : 0;

    return (
        <ToolPageLayout tool={tool}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Input Panel */}
                <div className="bg-white border border-border rounded-2xl p-8 shadow-sm flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Target Date</label>
                       <div className="relative group">
                            <input 
                                type="date" 
                                value={targetDate} 
                                onChange={e => setTargetDate(e.target.value)} 
                                className="w-full bg-surfaceHighlight/30 border-b-2 border-border focus:border-purple-500 rounded-t-lg px-3 py-3 text-2xl font-medium text-textMain outline-none transition-colors cursor-pointer" 
                            />
                            <History className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none group-hover:text-purple-500 transition-colors" size={20} />
                       </div>
                       <p className="text-xs text-textMuted leading-relaxed">
                           Select a date to count the total days elapsed since then, or remaining until then.
                       </p>
                    </div>
                </div>
                
                {/* Result Panel */}
                <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-8 flex flex-col justify-center items-center text-center gap-2 min-h-[200px] lg:min-h-0 relative overflow-hidden">
                    {result !== null && (
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={result}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative z-10 flex flex-col items-center"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted mb-2 bg-white/50 px-2 py-1 rounded">
                                    {result === 0 ? 'Today' : result > 0 ? 'Days Remaining' : 'Days Passed'}
                                </span>
                                <div className="text-6xl md:text-7xl font-bold text-textMain tracking-tighter tabular-nums mb-2">
                                    {absResult}
                                </div>
                                <div className="text-sm font-medium text-textMuted">
                                    From Today
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </ToolPageLayout>
    );
};