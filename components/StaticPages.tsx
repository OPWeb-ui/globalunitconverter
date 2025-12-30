
import React, { useEffect, useState } from 'react';
import { UNIT_TOOLS, DATE_TOOLS, FINANCE_TOOLS, APP_NAME, ExtendedConverterDef } from '../constants';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateConversion, formatResult } from '../utils/convert';
import { 
  ArrowRight, 
  Mail,
  Book,
  ArrowUpRight
} from 'lucide-react';

// --- Shared Components for Static Pages ---

const PageContainer: React.FC<{ title: string, subtitle?: string, children: React.ReactNode }> = ({ title, subtitle, children }) => {
  useEffect(() => { document.title = `${title} | ${APP_NAME}`; }, [title]);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto py-12 md:py-20 w-full px-4"
    >
      <div className="mb-12 border-b border-border/60 pb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-textMain tracking-tight mb-4">{title}</h1>
        {subtitle && <p className="text-lg text-textMuted leading-relaxed font-light">{subtitle}</p>}
      </div>
      <div className="space-y-12 text-base leading-7 text-textMain/90">
        {children}
      </div>
    </motion.div>
  );
};

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <h2 className="text-sm font-bold text-textMain uppercase tracking-wider mb-4">{title}</h2>
    <div className="text-textMuted leading-7">
      {children}
    </div>
  </section>
);

// --- Landing Page Specific Components ---

const ToolCard: React.FC<{ tool: ExtendedConverterDef }> = ({ tool }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Random start delay to desynchronize animations
    const delay = Math.random() * 2000;
    let timer: ReturnType<typeof setTimeout>;

    const next = () => {
        setIndex(prev => (prev + 1) % tool.previewExamples.length);
        const interval = 3500 + Math.random() * 2500;
        timer = setTimeout(next, interval);
    };

    const initialTimer = setTimeout(next, delay + 1000);
    return () => { clearTimeout(initialTimer); clearTimeout(timer); };
  }, [tool.previewExamples.length]);

  const ex = tool.previewExamples[index] || { val: 1, from: tool.units[0].id, to: tool.units[1].id };
  const fromUnit = tool.units.find(u => u.id === ex.from) || tool.units[0];
  const toUnit = tool.units.find(u => u.id === ex.to) || tool.units[1];
  
  let result = '...';
  try {
      result = formatResult(calculateConversion(ex.val, fromUnit, toUnit));
  } catch(e) {}

  return (
    <Link 
      to={`/${tool.id}`}
      className="flex flex-col justify-between p-5 bg-white border border-border rounded-xl hover:border-gray-300 hover:shadow-soft transition-all group h-28 relative overflow-hidden"
    >
      <div className="flex justify-between items-start z-10">
          <span className="text-sm font-semibold text-textMain tracking-tight">{tool.name}</span>
          <ArrowUpRight size={16} className="text-border group-hover:text-textMuted transition-colors" />
      </div>
      
      <div className="mt-auto relative overflow-hidden z-10">
        <AnimatePresence mode="wait">
           <motion.div
             key={index}
             initial={{ opacity: 0, y: 4 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -4 }}
             transition={{ duration: 0.3, ease: "easeOut" }}
             className="text-xs text-textMuted font-medium flex items-center gap-1.5"
           >
              <span className="text-textMain tabular-nums">{ex.val}</span>
              <span className="opacity-70">{fromUnit.symbol}</span>
              <span className="opacity-30">→</span>
              <span className="text-textMain tabular-nums">{result}</span>
              <span className="opacity-70">{toUnit.symbol}</span>
           </motion.div>
        </AnimatePresence>
      </div>
    </Link>
  );
};

const SecondaryToolLink: React.FC<{ tool: ExtendedConverterDef }> = ({ tool }) => (
  <Link 
    to={`/${tool.id}`}
    className="flex items-center gap-4 p-4 rounded-lg border border-transparent hover:border-border hover:bg-white transition-all group"
  >
    <div className={`text-textMuted/60 group-hover:text-textMain transition-colors`}>
      {React.cloneElement(tool.icon as React.ReactElement, { size: 18, strokeWidth: 1.5 })}
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-textMain group-hover:text-primary transition-colors">{tool.name}</span>
      <span className="text-[11px] text-textMuted">{tool.subtitle}</span>
    </div>
  </Link>
);

const GlobalStandardsHero = () => {
  const RIBBON_ITEMS = [
    { text: "SI Units", isLabel: true },
    { text: "m", isLabel: false },
    { text: "kg", isLabel: false },
    { text: "s", isLabel: false },
    { text: "K", isLabel: false },
    { text: "Imperial", isLabel: true },
    { text: "ft", isLabel: false },
    { text: "lb", isLabel: false },
    { text: "°F", isLabel: false },
    { text: "Finance", isLabel: true },
    { text: "$/hr", isLabel: false },
    { text: "Annual", isLabel: false },
  ];

  const marqueeContent = [...RIBBON_ITEMS, ...RIBBON_ITEMS, ...RIBBON_ITEMS, ...RIBBON_ITEMS];
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="w-full flex flex-col items-center justify-center h-[160px] md:h-[200px] mb-8 relative select-none overflow-hidden group">
      <div className="z-10 flex flex-col items-center w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-textMain tracking-tight mb-8 bg-background/50 px-8 py-3 rounded-full backdrop-blur-[2px] border border-border/40 shadow-sm">
          Global Unit Converter
        </h1>
        <div className="flex w-full items-center overflow-hidden opacity-40 hover:opacity-80 transition-opacity duration-700 relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div 
            className="flex items-center gap-10 whitespace-nowrap will-change-transform"
            animate={!prefersReducedMotion ? { x: ["0%", "-25%"] } : {}}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            style={{ width: "max-content" }}
          >
              {marqueeContent.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`${item.isLabel ? 'text-[9px] font-black uppercase tracking-[0.2em] text-textMuted/60 mr-2' : 'text-xs font-mono text-textMain/70'}`}>
                      {item.text}
                  </span>
                </div>
              ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};


// --- Pages ---

export const LandingPage = () => {
  useEffect(() => { document.title = APP_NAME; }, []);
  const hoverAnimation = { hover: { y: -2, transition: { duration: 0.2, ease: "easeOut" } } };

  return (
    <div className="flex flex-col pt-4 pb-20 w-full animate-fade-in">
        <GlobalStandardsHero />

        {/* 1. Primary Grid: Unit Converters */}
        <div className="max-w-4xl mx-auto w-full px-4 mb-16">
            <h2 className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-6 border-b border-border pb-2">
              Core Converters
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {UNIT_TOOLS.map(t => <ToolCard key={t.id} tool={t} />)}
            </div>
        </div>

        {/* 2. Secondary Grid: More Tools (Date & Salary) */}
        <div className="max-w-4xl mx-auto w-full px-4 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {/* Date Tools */}
              <div>
                <h2 className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-4 border-b border-border pb-2">
                  Date & Time
                </h2>
                <div className="flex flex-col gap-1">
                  {DATE_TOOLS.map(t => <SecondaryToolLink key={t.id} tool={t} />)}
                </div>
              </div>
              
              {/* Salary Tools */}
              <div>
                <h2 className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-4 border-b border-border pb-2">
                  Finance
                </h2>
                <div className="flex flex-col gap-1">
                  {FINANCE_TOOLS.map(t => <SecondaryToolLink key={t.id} tool={t} />)}
                </div>
              </div>
            </div>
        </div>

        {/* 3. Navigation Cards */}
        <div className="max-w-4xl mx-auto w-full px-4 mb-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div whileHover="hover" variants={hoverAnimation}>
                <Link 
                    to="/units" 
                    className="flex flex-col h-full justify-between p-6 rounded-xl border border-border bg-white hover:border-gray-300 hover:shadow-soft transition-all duration-200 group"
                >
                    <div className="mb-4">
                        <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-textMuted group-hover:text-primary transition-colors mb-4">
                             <Book size={18} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-base font-bold text-textMain mb-1">Encyclopedia</h3>
                        <p className="text-xs text-textMuted leading-relaxed">
                            Definitions, history, and facts.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-textMain group-hover:text-primary transition-colors">
                        <span>Browse</span>
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                </Link>
            </motion.div>

            <motion.div whileHover="hover" variants={hoverAnimation}>
                <a 
                    href="mailto:eztifyapps@gmail.com"
                    className="flex flex-col h-full justify-between p-6 rounded-xl border border-border bg-white hover:border-gray-300 hover:shadow-soft transition-all duration-200 group"
                >
                    <div className="mb-4">
                         <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center text-textMuted group-hover:text-primary transition-colors mb-4">
                             <Mail size={18} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-base font-bold text-textMain mb-1">Support</h3>
                        <p className="text-xs text-textMuted leading-relaxed">
                            Questions or feedback?
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-textMain group-hover:text-primary transition-colors">
                        <span>Contact Us</span>
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                </a>
            </motion.div>
        </div>
    </div>
  );
};

export const AboutPage = () => (
  <PageContainer title="About">
    <Section title="Philosophy">
      <p>
        Global Unit Converter is designed to be a silent partner in your workflow. We believe that utility tools should be fast, reliable, and invisible. There are no ads, no trackers, and no unnecessary distractions.
      </p>
    </Section>
    <Section title="Privacy First">
      <p>
        This application operates entirely client-side. Your inputs—whether they are salaries, dates, or measurements—are processed within your browser's memory and are never transmitted to any server.
      </p>
    </Section>
  </PageContainer>
);

export const HelpPage = () => (
  <PageContainer title="Help">
    <Section title="Unit Converters">
      <p>
        Edit the "Input" field on the left. The result updates instantly on the right. Use the swap button in the center to reverse the conversion direction.
      </p>
    </Section>
    <Section title="Calculators">
      <p>
        For tools like Date Difference or Salary Calculators, fill in all required fields. The result card will appear automatically once valid data is entered.
      </p>
    </Section>
  </PageContainer>
);

export const PrivacyPage = () => (
  <PageContainer title="Privacy Policy">
    <Section title="Zero Data Collection">
      <p>
        We do not collect, store, or transmit any personal data. All calculations happen locally on your device using JavaScript.
      </p>
    </Section>
  </PageContainer>
);

export const TermsPage = () => (
  <PageContainer title="Terms of Service">
    <Section title="Disclaimer">
      <p>
        The tools are provided "as is". While we strive for accuracy, these tools should not be used for mission-critical engineering, medical, or financial decisions where absolute precision is required.
      </p>
    </Section>
  </PageContainer>
);
