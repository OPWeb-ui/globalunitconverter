
import { ALL_TOOLS } from '../constants';
import { ConverterDef, Unit } from '../types';

export interface SearchResult {
  type: 'tool' | 'unit';
  label: string;
  subLabel?: string;
  score: number;
  category: 'unit' | 'date' | 'finance'; // For UI badge
  
  // Tool payload
  converter?: ConverterDef;
  fromUnit?: Unit;
  toUnit?: Unit;

  // Unit payload
  unitId?: string;
}

export function searchConverters(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 1) return [];

  const results: SearchResult[] = [];
  const normalized = q.replace(/(\s+(to|in|into|->)\s+)|(\s*->\s*)/g, ' ');
  const parts = normalized.split(/\s+/).filter(p => p.length > 0);

  ALL_TOOLS.forEach(conv => {
    // 1. Tool Logic (Unit Pairs)
    if (parts.length >= 2) {
       for (const u1 of conv.units) {
         for (const u2 of conv.units) {
            if (u1.id === u2.id) continue;
            
            const u1Match = hasToken(parts, u1);
            const u2Match = hasToken(parts, u2);

            if (u1Match && u2Match) {
               results.push({
                 type: 'tool',
                 converter: conv,
                 fromUnit: u1,
                 toUnit: u2,
                 label: `${u1.symbol} → ${u2.symbol}`,
                 subLabel: conv.name,
                 category: conv.category,
                 score: 100
               });
            }
         }
       }
    }

    // 2. Single Unit Matches
    for (const unit of conv.units) {
        if (hasToken(parts, unit) || unit.name.toLowerCase().includes(q)) {
             const defaultTo = conv.units.find(u => u.id !== unit.id) || conv.units[0];
             results.push({
                 type: 'tool',
                 converter: conv,
                 fromUnit: unit,
                 toUnit: defaultTo,
                 label: `Convert ${unit.name} (${unit.symbol})`,
                 subLabel: conv.name,
                 category: conv.category,
                 score: unit.symbol.toLowerCase() === q ? 80 : 50
             });

             // Only add Unit Reference for actual UNIT categories
             if (conv.category === 'unit') {
                if (unit.name.toLowerCase().includes(q) || unit.symbol.toLowerCase() === q) {
                    results.push({
                        type: 'unit',
                        unitId: unit.id,
                        label: `${unit.name} (${unit.symbol})`,
                        subLabel: 'Unit Reference',
                        category: 'unit',
                        score: unit.name.toLowerCase() === q ? 90 : 45
                    });
                }
             }
        }
    }

    // 3. Tool Name Matches
    if (conv.name.toLowerCase().includes(q)) {
        results.push({
            type: 'tool',
            converter: conv,
            fromUnit: conv.units[0],
            toUnit: conv.units[1] || conv.units[0],
            label: `${conv.name}`,
            subLabel: 'Tool',
            category: conv.category,
            score: 70
        });
    }
  });

  const uniqueMap = new Map<string, SearchResult>();
  results.forEach(r => {
      let key = '';
      if (r.type === 'tool') {
        key = `tool:${r.converter?.id}:${r.fromUnit?.id}:${r.toUnit?.id}`;
      } else {
        key = `unit:${r.unitId}`;
      }
      if (!uniqueMap.has(key) || uniqueMap.get(key)!.score < r.score) {
          uniqueMap.set(key, r);
      }
  });

  return Array.from(uniqueMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function hasToken(parts: string[], unit: Unit): boolean {
    const s = unit.symbol.toLowerCase();
    const n = unit.name.toLowerCase();
    return parts.some(p => p === s || p === n || (p.length > 2 && n.includes(p)));
}
