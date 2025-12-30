
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ExtendedConverterDef } from '../constants';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { calculateConversion, formatResult } from '../utils/convert';
import ToolPageLayout from './ToolPageLayout';
import { motion, AnimatePresence } from 'framer-motion';

interface ConverterCardProps {
  tool: ExtendedConverterDef;
}

// --- Minimal Dropdown ---
const MinimalUnitSelect: React.FC<{
  value: string;
  units: any[];
  onChange: (id: string) => void;
  align?: 'left' | 'right';
}> = ({ value, units, onChange, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = units.find(u => u.id === value) || units[0];

  useEffect(() => {
    const clickOut = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', clickOut);
    return () => document.removeEventListener('mousedown', clickOut);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-1.5 pl-3 pr-2 rounded-lg bg-surfaceHighlight hover:bg-gray-200 transition-colors text-textMain group"
      >
        <span className="text-xs font-bold uppercase tracking-wider">{selected.symbol}</span>
        <span className="text-sm font-medium text-textMain/70 group-hover:text-textMain hidden sm:inline-block">{selected.name}</span>
        <ChevronDown size={14} className="text-textMuted opacity-50" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.1 }}
            className={`absolute top-full mt-2 w-64 max-h-[300px] overflow-y-auto bg-white border border-border shadow-elevation rounded-xl z-50 scrollbar-hide py-1.5 ${align === 'right' ? 'right-0' : 'left-0'}`}
          >
            {units.map(u => (
               <button
                 key={u.id}
                 onClick={() => { onChange(u.id); setIsOpen(false); }}
                 className={`
                    w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-surfaceHighlight transition-colors
                    ${u.id === value ? 'text-primary font-medium' : 'text-textMain'}
                 `}
               >
                 <span>{u.name}</span>
                 <span className="text-xs font-mono opacity-50">{u.symbol}</span>
               </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---
const ConverterCard: React.FC<ConverterCardProps> = ({ tool }) => {
  const [searchParams] = useSearchParams();
  
  const getInitialState = () => {
    const paramFrom = searchParams.get('from');
    const paramTo = searchParams.get('to');
    const validFrom = tool.units.find(u => u.id === paramFrom);
    const validTo = tool.units.find(u => u.id === paramTo);
    return {
      from: validFrom ? validFrom.id : tool.units[0].id,
      to: validTo ? validTo.id : (tool.units[1]?.id || tool.units[0].id)
    };
  };

  const [units, setUnits] = useState(getInitialState);
  const [inputValue, setInputValue] = useState('1');
  const [inputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    setUnits(getInitialState());
    setInputValue('1');
  }, [tool.id]);

  useEffect(() => {
     const next = getInitialState();
     if (next.from !== units.from || next.to !== units.to) setUnits(next);
  }, [searchParams]);

  const fromUnit = useMemo(() => tool.units.find(u => u.id === units.from) || tool.units[0], [tool, units.from]);
  const toUnit = useMemo(() => tool.units.find(u => u.id === units.to) || tool.units[0], [tool, units.to]);

  const resultValue = useMemo(() => {
    if (!inputValue) return '';
    try {
      const result = calculateConversion(inputValue, fromUnit, toUnit);
      return formatResult(result);
    } catch { return '...'; }
  }, [inputValue, fromUnit, toUnit]);

  const handleSwap = () => {
    if (resultValue && resultValue !== '...') setInputValue(resultValue);
    setUnits({ from: units.to, to: units.from });
  };

  return (
    <ToolPageLayout tool={tool}>
       <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-0 bg-white border border-border rounded-2xl p-6 md:p-10 shadow-sm">
          
          {/* Input Side */}
          <div className="flex-1 flex flex-col gap-4">
             <div className="flex justify-between items-center">
                 <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Input</label>
                 <MinimalUnitSelect 
                   value={units.from} 
                   units={tool.units} 
                   onChange={(id) => setUnits(p => ({ ...p, from: id }))} 
                />
             </div>
             
             <div 
               className={`
                  flex items-baseline transition-colors duration-200 border-b-2 py-2
                  ${inputFocus ? 'border-primary' : 'border-border'}
               `}
             >
                <input 
                  type="text" 
                  inputMode="decimal"
                  value={inputValue}
                  onFocus={() => setInputFocus(true)}
                  onBlur={() => setInputFocus(false)}
                  onChange={(e) => /^\d*\.?\d*$/.test(e.target.value) && setInputValue(e.target.value)}
                  className="w-full bg-transparent text-5xl md:text-6xl font-light tracking-tight text-textMain outline-none tabular-nums placeholder:text-border"
                  placeholder="0"
                />
             </div>
          </div>

          {/* Center Action */}
          <div className="flex justify-center md:px-12">
              <button 
                 onClick={handleSwap}
                 className="p-3 rounded-full bg-surfaceHighlight hover:bg-gray-200 text-textMuted hover:text-textMain transition-all active:scale-95 group"
                 aria-label="Swap units"
              >
                 <ArrowUpDown size={20} strokeWidth={1.5} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
          </div>

          {/* Result Side */}
          <div className="flex-1 flex flex-col gap-4">
             <div className="flex justify-between items-center">
                 <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Result</label>
                 <MinimalUnitSelect 
                   value={units.to} 
                   units={tool.units} 
                   onChange={(id) => setUnits(p => ({ ...p, to: id }))} 
                   align="right"
                />
             </div>
             
             <div className="flex items-baseline border-b-2 border-transparent py-2">
                <div className="w-full text-5xl md:text-6xl font-light tracking-tight text-textMain tabular-nums select-all overflow-hidden text-ellipsis">
                   {resultValue}
                </div>
             </div>
          </div>

       </div>
    </ToolPageLayout>
  );
};

export default ConverterCard;
