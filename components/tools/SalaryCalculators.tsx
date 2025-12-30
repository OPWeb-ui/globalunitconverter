import React, { useState } from 'react';
import { ExtendedConverterDef } from '../../constants';
import ToolPageLayout from '../ToolPageLayout';
import { motion } from 'framer-motion';

const WEEKS_PER_YEAR = 52;
const MONTHS_PER_YEAR = 12;

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const BreakdownRow: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
    <div className={`flex justify-between items-center py-2.5 border-b border-border/50 last:border-0 ${highlight ? 'text-green-700' : 'text-textMain'}`}>
        <span className={`text-sm ${highlight ? 'font-bold' : 'font-medium text-textMuted'}`}>{label}</span>
        <span className={`text-base ${highlight ? 'font-bold' : 'font-semibold'}`}>{value}</span>
    </div>
);

// --- Tool 1: Salary to Hourly ---
export const SalaryToHourlyTool: React.FC<{ tool: ExtendedConverterDef }> = ({ tool }) => {
  const [amount, setAmount] = useState('50000');
  const [hours, setHours] = useState('40');

  const breakdown = React.useMemo(() => {
    const s = parseFloat(amount); const h = parseFloat(hours);
    if (isNaN(s) || isNaN(h) || h <= 0) return null;
    return { hourly: s/(h*WEEKS_PER_YEAR), weekly: s/WEEKS_PER_YEAR, monthly: s/MONTHS_PER_YEAR, salary: s };
  }, [amount, hours]);

  return (
    <ToolPageLayout tool={tool}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Input Side */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Annual Salary</label>
                    <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-surfaceHighlight/30 focus-within:border-green-500 focus-within:bg-white transition-all">
                        <span className="text-xl text-textMuted font-light select-none">$</span>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={e => setAmount(e.target.value)} 
                            className="flex-1 bg-transparent text-2xl font-light outline-none tabular-nums text-textMain placeholder-textMuted/30" 
                            placeholder="0"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Hours / Week</label>
                    <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-surfaceHighlight/30 focus-within:border-green-500 focus-within:bg-white transition-all">
                        <input 
                            type="number" 
                            value={hours} 
                            onChange={e => setHours(e.target.value)} 
                            className="flex-1 bg-transparent text-2xl font-light outline-none tabular-nums text-textMain placeholder-textMuted/30" 
                            placeholder="40"
                        />
                        <span className="text-xs font-bold text-textMuted uppercase">Hrs</span>
                    </div>
                </div>
            </div>

            {/* Result Side */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="bg-green-50 rounded-xl p-5 border border-green-100 h-full flex flex-col justify-center">
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-green-700 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Breakdown
                    </h3>
                    {breakdown ? (
                        <div className="flex flex-col gap-1">
                            <BreakdownRow label="Hourly Rate" value={`${formatCurrency(breakdown.hourly)} /hr`} highlight />
                            <BreakdownRow label="Weekly Pay" value={formatCurrency(breakdown.weekly)} />
                            <BreakdownRow label="Monthly Pay" value={formatCurrency(breakdown.monthly)} />
                        </div>
                    ) : <div className="text-textMuted italic text-sm text-center py-4">Enter salary details...</div>}
                </div>
            </div>
        </div>
    </ToolPageLayout>
  );
};

// --- Tool 2: Hourly to Annual ---
export const HourlyToAnnualTool: React.FC<{ tool: ExtendedConverterDef }> = ({ tool }) => {
  const [rate, setRate] = useState('25');
  const [hours, setHours] = useState('40');

  const breakdown = React.useMemo(() => {
    const r = parseFloat(rate); const h = parseFloat(hours);
    if (isNaN(r) || isNaN(h) || h <= 0) return null;
    const weekly = r * h;
    return { rate: r, weekly, monthly: (weekly * WEEKS_PER_YEAR)/MONTHS_PER_YEAR, annual: weekly * WEEKS_PER_YEAR };
  }, [rate, hours]);

  return (
    <ToolPageLayout tool={tool}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Input Side */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Hourly Rate</label>
                    <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-surfaceHighlight/30 focus-within:border-green-500 focus-within:bg-white transition-all">
                        <span className="text-xl text-textMuted font-light select-none">$</span>
                        <input 
                            type="number" 
                            value={rate} 
                            onChange={e => setRate(e.target.value)} 
                            className="flex-1 bg-transparent text-2xl font-light outline-none tabular-nums text-textMain placeholder-textMuted/30" 
                            placeholder="0"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Hours / Week</label>
                    <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-surfaceHighlight/30 focus-within:border-green-500 focus-within:bg-white transition-all">
                        <input 
                            type="number" 
                            value={hours} 
                            onChange={e => setHours(e.target.value)} 
                            className="flex-1 bg-transparent text-2xl font-light outline-none tabular-nums text-textMain placeholder-textMuted/30" 
                            placeholder="40"
                        />
                        <span className="text-xs font-bold text-textMuted uppercase">Hrs</span>
                    </div>
                </div>
            </div>

            {/* Result Side */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="bg-green-50 rounded-xl p-5 border border-green-100 h-full flex flex-col justify-center">
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-green-700 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Projection
                    </h3>
                    {breakdown ? (
                        <div className="flex flex-col gap-1">
                            <BreakdownRow label="Annual Salary" value={`${formatCurrency(breakdown.annual)} /yr`} highlight />
                            <BreakdownRow label="Monthly Pay" value={formatCurrency(breakdown.monthly)} />
                            <BreakdownRow label="Weekly Pay" value={formatCurrency(breakdown.weekly)} />
                        </div>
                    ) : <div className="text-textMuted italic text-sm text-center py-4">Enter wage details...</div>}
                </div>
            </div>
        </div>
    </ToolPageLayout>
  );
};