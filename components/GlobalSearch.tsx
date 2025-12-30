
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchConverters, SearchResult } from '../utils/search';

const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setResults(searchConverters(query));
  }, [query]);

  useEffect(() => {
    const clickOut = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', clickOut);
    return () => document.removeEventListener('mousedown', clickOut);
  }, []);

  const handleSelect = (r: SearchResult) => {
    setQuery('');
    setIsOpen(false);
    
    if (r.type === 'unit' && r.unitId) {
        navigate(`/unit/${r.unitId}`);
    } else if (r.type === 'tool' && r.converter && r.fromUnit && r.toUnit) {
        navigate(`/${r.converter.id}?from=${r.fromUnit.id}&to=${r.toUnit.id}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative group">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-textMuted w-3 h-3 transition-colors group-focus-within:text-primary" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search tools & units..."
          className="w-full h-9 pl-8 pr-3 bg-slate-50 border border-border/50 rounded-lg focus:bg-white focus:border-primary/20 outline-none transition-all text-[11px] font-bold uppercase tracking-wider placeholder:normal-case placeholder:font-medium placeholder:text-textMuted/50"
          autoComplete="off"
        />
      </div>

      {isOpen && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-[100] animate-fade-in">
          <div className="max-h-[320px] overflow-y-auto scrollbar-hide py-1">
            {results.length > 0 ? (
              <ul>
                {results.map((r, i) => (
                  <li key={i}>
                    <button onClick={() => handleSelect(r)} className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-border/40 last:border-0 text-left group">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-textMain">{r.label}</span>
                        <span className="text-[9px] text-textMuted font-medium">{r.subLabel}</span>
                      </div>
                      <span className={`
                         px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider
                         ${r.category === 'unit' ? 'bg-blue-50 text-blue-600' : ''}
                         ${r.category === 'finance' ? 'bg-green-50 text-green-600' : ''}
                         ${r.category === 'date' ? 'bg-purple-50 text-purple-600' : ''}
                      `}>
                        {r.category === 'unit' ? 'Unit' : r.category === 'finance' ? 'Salary' : 'Date'}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-[10px] font-bold text-textMuted uppercase tracking-widest">No matches found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
