
import React from 'react';

export type UnitType = 
  | 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed' | 'time' | 'data' 
  | 'salary_hourly' | 'hourly_annual'
  | 'date_diff' | 'days_from_now' | 'days_from_date' | 'days_in_year';

export type ToolCategory = 'unit' | 'date' | 'finance';

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  ratio?: number; // Base ratio for simple conversions
  formula?: {
    toBase: (val: number) => number;
    fromBase: (val: number) => number;
  };
  // Enhancements for non-numeric tools
  inputType?: 'number' | 'date'; 
}

export interface ConverterDef {
  id: UnitType;
  name: string;
  description: string;
  category: ToolCategory; // New categorization
  icon: React.ReactNode;
  units: Unit[];
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
}
