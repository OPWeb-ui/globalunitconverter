import React, { useState } from 'react';
import { ExtendedConverterDef } from '../constants';
import ToolPageLayout from './ToolPageLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertCircle, ChevronDown, Calendar } from 'lucide-react';

const DAY_OPTIONS = [
  { value: 'all', label: 'Days (Total)', noun: 'days' },
  { value: 'weekdays', label: 'Weekdays (Mon–Fri)', noun: 'weekdays' },
  { value: 'weekends', label: 'Weekends (Sat–Sun)', noun: 'weekends' },
  { value: '1', label: 'Mondays', noun: 'Mondays' },
  { value: '2', label: 'Tuesdays', noun: 'Tuesdays' },
  { value: '3', label: 'Wednesdays', noun: 'Wednesdays' },
  { value: '4', label: 'Thursdays', noun: 'Thursdays' },
  { value: '5', label: 'Fridays', noun: 'Fridays' },
  { value: '6', label: 'Saturdays', noun: 'Saturdays' },
  { value: '0', label: 'Sundays', noun: 'Sundays' },
];

const DaysInYearTool: React.FC<{ tool: ExtendedConverterDef }> = ({ tool }) => {
  const [dayType, setDayType] = useState('all');
  const [yearInput, setYearInput] = useState(new Date().getFullYear().toString());
  const [result, setResult] = useState<{ count: number; noun: string; year: number; explanation: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setResult(null);

    const year = parseInt(yearInput);
    if (isNaN(year) || year < 1753 || year > 2038) {
      setError('Please enter a year between 1753 and 2038.');
      return;
    }

    // Calculation Logic
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const totalDays = isLeap ? 366 : 365;
    let count = 0;
    
    if (dayType === 'all') {
        count = totalDays;
    } else {
        // Precise day counting
        for (let i = 0; i < totalDays; i++) {
            // Note: Months are 0-indexed in JS Date (0 = Jan)
            const date = new Date(year, 0, 1 + i);
            const day = date.getDay();
            
            if (dayType === 'weekdays' && day >= 1 && day <= 5) count++;
            else if (dayType === 'weekends' && (day === 0 || day === 6)) count++;
            else if (dayType === day.toString()) count++;
        }
    }

    const selectedOption = DAY_OPTIONS.find(o => o.value === dayType);
    const explanation = isLeap 
        ? `${year} is a leap year.` 
        : `${year} is a common year.`;

    setResult({
        count,
        noun: selectedOption?.noun || 'days',
        year,
        explanation
    });
  };

  return (
    <ToolPageLayout tool={tool}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Input Panel */}
            <form onSubmit={handleCalculate} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Count</label>
                         <div className="relative group">
                             <select 
                                value={dayType} 
                                onChange={(e) => setDayType(e.target.value)}
                                className="w-full appearance-none bg-surfaceHighlight/30 border border-border rounded-lg px-3 py-2.5 text-lg font-medium text-textMain outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all cursor-pointer"
                             >
                                 {DAY_OPTIONS.map(opt => (
                                     <option key={opt.value} value={opt.value}>{opt.label}</option>
                                 ))}
                             </select>
                             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none group-hover:text-textMain transition-colors" size={16} />
                         </div>
                    </div>

                    <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-bold text-textMuted uppercase tracking-wider">In Year</label>
                         <div className="relative">
                            <input 
                                type="number" 
                                value={yearInput}
                                onChange={(e) => setYearInput(e.target.value)}
                                className="w-full bg-surfaceHighlight/30 border border-border rounded-lg px-3 py-2.5 pl-10 text-lg font-medium text-textMain outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder:text-textMuted/30 tabular-nums"
                                placeholder="e.g. 2025"
                                min="1753"
                                max="2038"
                            />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={16} />
                         </div>
                    </div>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded text-xs font-medium"
                    >
                        <AlertCircle size={14} /> {error}
                    </motion.div>
                )}

                <button 
                    type="submit"
                    className="w-full bg-textMain text-white font-semibold py-3 rounded-lg hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
                >
                    <span>Calculate</span>
                    <ArrowRight size={16} className="opacity-80" />
                </button>
            </form>

            {/* Answer Panel */}
            <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center gap-4 min-h-[200px] lg:min-h-0">
                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div 
                            key={result.year + result.noun}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center gap-2"
                        >
                             <div className="text-[10px] font-bold uppercase tracking-wider text-textMuted bg-white/50 px-2 py-1 rounded mb-2">
                                Total Count
                             </div>
                             <div className="text-6xl font-bold text-textMain tracking-tighter tabular-nums text-purple-600">
                                {result.count}
                             </div>
                             <div className="text-lg text-textMuted font-medium">
                                {result.noun} in {result.year}
                             </div>
                             <div className="mt-4 pt-4 border-t border-purple-200/50 w-full text-xs text-textMuted">
                                {result.explanation}
                             </div>
                        </motion.div>
                    ) : (
                         <div className="text-textMuted text-sm">Enter year to count days</div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    </ToolPageLayout>
  );
};

export default DaysInYearTool;