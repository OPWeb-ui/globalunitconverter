
import { Unit } from '../types';

export function calculateConversion(value: string | number, fromUnit: Unit, toUnit: Unit): number | string {
  
  // --- Special Logic: Days In Year ---
  if (fromUnit.id === 'year_input') {
    const year = typeof value === 'string' ? parseInt(value) : value;
    if (isNaN(year)) return 0;
    return isLeapYear(year) ? 366 : 365;
  }

  // --- Special Logic: Days From Now ---
  if (fromUnit.id === 'days_offset') {
    const days = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(days)) return 'Invalid';
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  }

  // --- Special Logic: Date Difference / Days From Date ---
  if (fromUnit.id === 'date_point') {
    if (!value || typeof value !== 'string') return '';
    const start = new Date(value);
    const end = new Date();
    // Reset hours to compare dates only
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    
    const diffMs = start.getTime() - end.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    // Case 1: Just the day count
    if (toUnit.id === 'days_count') {
      return Math.abs(diffDays);
    }
    
    // Case 2: Formatted duration text (Date Difference)
    if (toUnit.id === 'duration_text') {
       return formatDuration(start, end);
    }
  }

  // --- Standard Numeric Logic (Units & Salary) ---
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return 0;

  let baseValue = numValue;
  
  // Convert to base unit
  if (fromUnit.formula) {
    baseValue = fromUnit.formula.toBase(numValue);
  } else if (fromUnit.ratio) {
    baseValue = numValue * fromUnit.ratio;
  }

  // Convert from base unit to target
  let result = baseValue;
  if (toUnit.formula) {
    result = toUnit.formula.fromBase(baseValue);
  } else if (toUnit.ratio) {
    result = baseValue / toUnit.ratio;
  }

  return result;
}

// Helper: Leap Year
function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Helper: Duration Text
function formatDuration(d1: Date, d2: Date) {
  // Always calculate positive duration for display
  const start = d1 < d2 ? d1 : d2;
  const end = d1 < d2 ? d2 : d1;
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    // Days in previous month
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  if (days > 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  
  if (parts.length === 0) return "Same day";
  return parts.join(', ');
}


export function formatResult(val: number | string): string {
  if (typeof val === 'string') return val;
  if (isNaN(val)) return '0';
  
  if (Number.isInteger(val)) return val.toString();
  if (Math.abs(val) < 0.000001 && val !== 0) return val.toExponential(4);
  
  return parseFloat(val.toFixed(6)).toString();
}

export function safeFloat(val: string): number {
  const parsed = parseFloat(val);
  return isNaN(parsed) ? 0 : parsed;
}
