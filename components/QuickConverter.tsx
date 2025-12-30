
import React, { useState, useMemo } from 'react';
import { ALL_CONVERTERS } from '../constants';
import { calculateConversion, formatResult } from '../utils/convert';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

const QuickConverter: React.FC = () => {
  const [toolId, setToolId] = useState(ALL_CONVERTERS[0].id);
  const tool = ALL_CONVERTERS.find(t => t.id === toolId) || ALL_CONVERTERS[0];

  const [fromUnitId, setFromUnitId] = useState(tool.units[0].id);
  const [toUnitId, setToUnitId] = useState(tool.units[1]?.id || tool.units[0].id);
  const [inputValue, setInputValue] = useState('1');

  const handleToolChange = (newToolId: string) => {
    setToolId(newToolId);
    const newTool = ALL_CONVERTERS.find(t => t.id === newToolId) || ALL_CONVERTERS[0];
    setFromUnitId(newTool.units[0].id);
    setToUnitId(newTool.units[1]?.id || newTool.units[0].id);
    setInputValue('1');
  };

  const fromUnit = tool.units.find(u => u.id === fromUnitId) || tool.units[0];
  const toUnit = tool.units.find(u => u.id === toUnitId) || tool.units[0];

  const calculatedValue = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '...';
    const result = calculateConversion(val, fromUnit, toUnit);
    return formatResult(result);
  }, [inputValue, fromUnit, toUnit]);

  const handleSwap = () => {
    const oldFrom = fromUnitId;
    const oldTo = toUnitId;
    setFromUnitId(oldTo);
    setToUnitId(oldFrom);
    if (calculatedValue !== '...') setInputValue(calculatedValue);
  };

  return (
    <div className="flex flex-col gap-4">
        
        <div>
            <label className="block text-xs font-semibold text-textMuted uppercase mb-1.5">Tool</label>
            <div className="relative">
                <select
                    value={toolId}
                    onChange={(e) => handleToolChange(e.target.value)}
                    className="w-full appearance-none bg-white border border-border rounded-lg py-2 pl-3 pr-8 text-sm font-medium text-textMain focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                    {ALL_CONVERTERS.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" />
            </div>
        </div>

        <div className="flex flex-col gap-0 border border-border rounded-lg overflow-hidden shadow-sm">
            
            <div className="bg-surfaceHighlight p-3 flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-textMuted uppercase">From</span>
                 </div>
                 <div className="flex gap-2">
                     <input 
                        type="text" 
                        inputMode="decimal"
                        value={inputValue}
                        onChange={(e) => /^\d*\.?\d*$/.test(e.target.value) && setInputValue(e.target.value)}
                        className="flex-1 min-w-0 bg-white border border-border rounded-md px-2 py-1.5 text-lg font-medium text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-textMuted/40"
                    />
                    <div className="relative w-1/3 min-w-[80px]">
                        <select
                            value={fromUnitId}
                            onChange={(e) => setFromUnitId(e.target.value)}
                            className="w-full h-full appearance-none bg-white border border-border rounded-md pl-2 pr-6 text-xs font-medium text-textMain focus:outline-none focus:border-primary"
                        >
                            {tool.units.map(u => (
                                <option key={u.id} value={u.id}>{u.symbol}</option>
                            ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" />
                    </div>
                 </div>
            </div>

            <div className="relative h-px bg-border z-10">
                <button 
                    onClick={handleSwap}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
                    title="Swap"
                >
                    <ArrowUpDown size={12} />
                </button>
            </div>

            <div className="bg-white p-3 flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-primary uppercase">To</span>
                 </div>
                 <div className="flex gap-2">
                     <div className="flex-1 min-w-0 bg-transparent px-2 py-1.5 text-lg font-semibold text-primary truncate">
                        {calculatedValue}
                     </div>
                     <div className="relative w-1/3 min-w-[80px]">
                        <select
                            value={toUnitId}
                            onChange={(e) => setToUnitId(e.target.value)}
                            className="w-full h-full appearance-none bg-gray-50 border border-border rounded-md pl-2 pr-6 text-xs font-medium text-textMain focus:outline-none focus:border-primary"
                        >
                            {tool.units.map(u => (
                                <option key={u.id} value={u.id}>{u.symbol}</option>
                            ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" />
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default QuickConverter;
