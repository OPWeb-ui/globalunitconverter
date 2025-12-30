
import React from 'react';
import { ConverterDef, Unit } from './types';
import { 
  Ruler, 
  Weight, 
  Thermometer, 
  Box, 
  Droplets, 
  Gauge, 
  Clock, 
  HardDrive,
  Calendar,
  Briefcase,
  DollarSign,
  Calculator,
  Hourglass,
  History,
  Sun
} from 'lucide-react';

// --- Extended Type for SEO and UI Enhancements ---
export interface PreviewExample {
  val: number | string;
  from: string;
  to: string;
}

export interface ExtendedConverterDef extends ConverterDef {
  metaDescription: string;
  subtitle: string;
  aboutText: string;
  accentColor: string; 
  previewExamples: PreviewExample[];
  detailedContent: {
    whatIsIt: string;
    whoIsItFor: string;
  };
}

// --- Helper for linear units ---
const linearUnit = (id: string, name: string, symbol: string, ratio: number): Unit => ({
  id, name, symbol, ratio, inputType: 'number'
});

// ============================================================================
// 1. UNIT CONVERTERS
// ============================================================================

export const LENGTH_CONVERTER: ExtendedConverterDef = {
  id: 'length',
  name: 'Length',
  category: 'unit',
  accentColor: '#3B82F6',
  subtitle: 'Convert between meters, feet, inches, and more.',
  description: 'Precision length conversion between Metric and Imperial systems.',
  metaDescription: 'Instantly convert meters, kilometers, inches, and feet with our fast, accurate Length Converter.',
  aboutText: 'This Length Converter allows you to convert between meters, kilometers, centimeters, inches, feet, and yards. Calculations run instantly in your browser.',
  previewExamples: [
    { val: 1, from: 'm', to: 'ft' },
    { val: 10, from: 'cm', to: 'in' },
    { val: 1, from: 'mi', to: 'km' }
  ],
  detailedContent: {
    whatIsIt: 'Length conversion involves changing a measurement from one unit of distance to another.',
    whoIsItFor: 'Essential for students, architects, and travelers.'
  },
  icon: <Ruler size={18} strokeWidth={1.5} />,
  units: [
    linearUnit('m', 'Meter', 'm', 1),
    linearUnit('km', 'Kilometer', 'km', 1000),
    linearUnit('cm', 'Centimeter', 'cm', 0.01),
    linearUnit('mm', 'Millimeter', 'mm', 0.001),
    linearUnit('in', 'Inch', 'in', 0.0254),
    linearUnit('ft', 'Foot', 'ft', 0.3048),
    linearUnit('yd', 'Yard', 'yd', 0.9144),
    linearUnit('mi', 'Mile', 'mi', 1609.344),
  ]
};

export const WEIGHT_CONVERTER: ExtendedConverterDef = {
  id: 'weight',
  name: 'Weight',
  category: 'unit',
  accentColor: '#6366F1',
  subtitle: 'Calculate kilograms, pounds, ounces, and grams.',
  description: 'Accurate weight and mass conversion.',
  metaDescription: 'Instantly convert kilograms, pounds, grams, and ounces.',
  aboutText: 'Our Weight Converter provides seamless translation between metric and imperial mass units.',
  previewExamples: [
    { val: 1, from: 'kg', to: 'lb' },
    { val: 500, from: 'g', to: 'oz' },
    { val: 1, from: 't', to: 'kg' }
  ],
  detailedContent: {
    whatIsIt: 'Weight conversion allows you to translate values between standardized systems like Metric and Avoirdupois.',
    whoIsItFor: 'Used by logistics professionals, chefs, and scientists.'
  },
  icon: <Weight size={18} strokeWidth={1.5} />,
  units: [
    linearUnit('kg', 'Kilogram', 'kg', 1),
    linearUnit('g', 'Gram', 'g', 0.001),
    linearUnit('mg', 'Milligram', 'mg', 0.000001),
    linearUnit('lb', 'Pound', 'lb', 0.45359237),
    linearUnit('oz', 'Ounce', 'oz', 0.0283495231),
    linearUnit('t', 'Metric Ton', 't', 1000),
  ]
};

export const TEMP_CONVERTER: ExtendedConverterDef = {
  id: 'temperature',
  name: 'Temperature',
  category: 'unit',
  accentColor: '#F59E0B',
  subtitle: 'Switch between Celsius, Fahrenheit, and Kelvin.',
  description: 'Convert thermal measurements across scales.',
  metaDescription: 'Instantly convert Celsius, Fahrenheit, and Kelvin.',
  aboutText: 'Quickly calculate temperature differences for weather, science, or cooking.',
  previewExamples: [
    { val: 0, from: 'c', to: 'f' },
    { val: 100, from: 'c', to: 'k' },
    { val: 72, from: 'f', to: 'c' }
  ],
  detailedContent: {
    whatIsIt: 'Temperature conversion relies on formulas to account for different zero-points.',
    whoIsItFor: 'Meteorologists, lab researchers, and chefs.'
  },
  icon: <Thermometer size={18} strokeWidth={1.5} />,
  units: [
    { id: 'c', name: 'Celsius', symbol: '°C', inputType: 'number', formula: { toBase: (v) => v, fromBase: (v) => v } },
    { id: 'f', name: 'Fahrenheit', symbol: '°F', inputType: 'number', formula: { toBase: (v) => (v - 32) * 5/9, fromBase: (v) => (v * 9/5) + 32 } },
    { id: 'k', name: 'Kelvin', symbol: 'K', inputType: 'number', formula: { toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 } },
  ]
};

export const AREA_CONVERTER: ExtendedConverterDef = {
  id: 'area',
  name: 'Area',
  category: 'unit',
  accentColor: '#10B981',
  subtitle: 'Convert square meters, acres, and hectares.',
  description: 'Convert surface measurements for real estate.',
  metaDescription: 'Instantly convert square meters, acres, and hectares.',
  aboutText: 'Designed for real estate and landscaping, this Area Converter translates two-dimensional measurements instantly.',
  previewExamples: [
    { val: 1, from: 'ac', to: 'sqm' },
    { val: 100, from: 'sqft', to: 'sqm' },
    { val: 1, from: 'ha', to: 'ac' }
  ],
  detailedContent: {
    whatIsIt: 'Area conversion measures two-dimensional space.',
    whoIsItFor: 'Real estate agents, farmers, and designers.'
  },
  icon: <Box size={18} strokeWidth={1.5} />,
  units: [
    linearUnit('sqm', 'Square Meter', 'm²', 1),
    linearUnit('sqkm', 'Square Kilometer', 'km²', 1e6),
    linearUnit('sqft', 'Square Foot', 'ft²', 0.092903),
    linearUnit('ac', 'Acre', 'ac', 4046.86),
    linearUnit('ha', 'Hectare', 'ha', 10000),
  ]
};

export const VOLUME_CONVERTER: ExtendedConverterDef = {
  id: 'volume',
  name: 'Volume',
  category: 'unit',
  accentColor: '#06B6D4',
  subtitle: 'Liters, gallons, and cubic meters conversion.',
  description: 'Convert liquid and solid capacity.',
  metaDescription: 'Instantly convert liters, gallons, and milliliters.',
  aboutText: 'This Volume Converter handles liquid and solid capacity measurements.',
  previewExamples: [
    { val: 1, from: 'gal_us', to: 'l' },
    { val: 250, from: 'ml', to: 'cup_us' },
    { val: 1, from: 'm3', to: 'l' }
  ],
  detailedContent: {
    whatIsIt: 'Volume measures the three-dimensional space an object occupies.',
    whoIsItFor: 'Logistics planners, chemistry students, and cooks.'
  },
  icon: <Droplets size={18} strokeWidth={1.5} />,
  units: [
    linearUnit('l', 'Liter', 'L', 1),
    linearUnit('ml', 'Milliliter', 'mL', 0.001),
    linearUnit('gal_us', 'Gallon (US)', 'gal', 3.78541),
    linearUnit('floz_us', 'Fluid Ounce (US)', 'fl oz', 0.0295735),
    linearUnit('m3', 'Cubic Meter', 'm³', 1000),
  ]
};

export const SPEED_CONVERTER: ExtendedConverterDef = {
  id: 'speed',
  name: 'Speed',
  category: 'unit',
  accentColor: '#0EA5E9',
  subtitle: 'Convert km/h, mph, and knots instantly.',
  description: 'Convert velocity across land, sea, and air.',
  metaDescription: 'Instantly convert km/h, mph, knots, and m/s.',
  aboutText: 'Our Speed Converter supports land velocity, nautical knots, and scientific meters per second.',
  previewExamples: [
    { val: 60, from: 'mph', to: 'kph' },
    { val: 10, from: 'mps', to: 'kph' },
    { val: 1, from: 'kn', to: 'kph' }
  ],
  detailedContent: {
    whatIsIt: 'Speed conversion calculates the rate of change of position with respect to time.',
    whoIsItFor: 'Pilots, drivers, and physics students.'
  },
  icon: <Gauge size={18} strokeWidth={1.5} />,
  units: [
    linearUnit('mps', 'Meter per second', 'm/s', 1),
    linearUnit('kph', 'Kilometer per hour', 'km/h', 0.277778),
    linearUnit('mph', 'Miles per hour', 'mph', 0.44704),
    linearUnit('kn', 'Knot', 'kn', 0.514444),
  ]
};

export const TIME_CONVERTER: ExtendedConverterDef = {
  id: 'time',
  name: 'Time',
  category: 'unit',
  accentColor: '#8B5CF6',
  subtitle: 'Duration conversion from seconds to years.',
  description: 'Duration conversion from milliseconds to centuries.',
  metaDescription: 'Instantly convert seconds, minutes, hours, and days.',
  aboutText: 'This Time Converter simplifies duration tracking across scientific and common units.',
  previewExamples: [
    { val: 1, from: 'h', to: 'min' },
    { val: 24, from: 'h', to: 's' },
    { val: 1, from: 'w', to: 'd' }
  ],
  detailedContent: {
    whatIsIt: 'Time conversion standardizes durations across different scales.',
    whoIsItFor: 'Project managers, researchers, and schedulers.'
  },
  icon: <Clock size={18} strokeWidth={1.5} />,
  units: [
    linearUnit('s', 'Second', 's', 1),
    linearUnit('min', 'Minute', 'min', 60),
    linearUnit('h', 'Hour', 'h', 3600),
    linearUnit('d', 'Day', 'd', 86400),
    linearUnit('w', 'Week', 'wk', 604800),
    linearUnit('y', 'Year', 'yr', 31536000),
  ]
};

export const DATA_CONVERTER: ExtendedConverterDef = {
  id: 'data',
  name: 'Digital Storage',
  category: 'unit',
  accentColor: '#64748B',
  subtitle: 'Convert MB, GB, TB, and Bits.',
  description: 'Binary and decimal data storage conversion.',
  metaDescription: 'Instantly convert GB, MB, TB, and KB.',
  aboutText: 'Calculates digital storage using binary-standard multipliers.',
  previewExamples: [
    { val: 1, from: 'gb', to: 'mb' },
    { val: 1024, from: 'kb', to: 'mb' },
    { val: 1, from: 'tb', to: 'gb' }
  ],
  detailedContent: {
    whatIsIt: 'Data storage conversion translates values between magnitudes of digital information.',
    whoIsItFor: 'IT professionals and developers.'
  },
  icon: <HardDrive size={18} strokeWidth={1.5} />,
  units: [
    linearUnit('b', 'Byte', 'B', 1),
    linearUnit('kb', 'Kilobyte', 'KB', 1024),
    linearUnit('mb', 'Megabyte', 'MB', 1048576),
    linearUnit('gb', 'Gigabyte', 'GB', 1073741824),
    linearUnit('tb', 'Terabyte', 'TB', 1099511627776),
  ]
};

// ============================================================================
// 2. SALARY & PAY TOOLS (SPLIT)
// ============================================================================

const salaryUnits = [
    linearUnit('hour', 'Hourly', '/hr', 1),
    linearUnit('day', 'Daily (8h)', '/day', 8),
    linearUnit('week', 'Weekly (40h)', '/wk', 40),
    linearUnit('biweek', 'Bi-Weekly (80h)', '/2wk', 80),
    linearUnit('month', 'Monthly', '/mo', 173.333),
    linearUnit('year', 'Annual', '/yr', 2080),
];

// Tool 1: Salary to Hourly
export const SALARY_TO_HOURLY: ExtendedConverterDef = {
  id: 'salary_hourly',
  name: 'Salary to Hourly',
  category: 'finance',
  accentColor: '#16A34A',
  subtitle: 'Convert annual salary to hourly rate.',
  description: 'Calculate your hourly wage from your yearly salary.',
  metaDescription: 'Convert annual salary to hourly wage calculator.',
  aboutText: 'Find out how much you earn per hour based on your annual salary. Assumes a standard 40-hour work week.',
  previewExamples: [ { val: 60000, from: 'year', to: 'hour' } ],
  detailedContent: { whatIsIt: 'Converts annual income to smaller time units.', whoIsItFor: 'Employees negotiating pay.' },
  icon: <DollarSign size={18} strokeWidth={1.5} />,
  units: [
      { ...salaryUnits[5] }, // Year (Default From)
      { ...salaryUnits[0] }, // Hour (Default To)
      ...salaryUnits.slice(1, 5)
  ]
};

// Tool 2: Hourly to Annual
export const HOURLY_TO_ANNUAL: ExtendedConverterDef = {
  id: 'hourly_annual',
  name: 'Hourly to Annual',
  category: 'finance',
  accentColor: '#16A34A',
  subtitle: 'Convert hourly rate to annual salary.',
  description: 'Calculate your yearly salary from your hourly wage.',
  metaDescription: 'Convert hourly wage to annual salary calculator.',
  aboutText: 'See what your hourly rate looks like as a full-time annual salary.',
  previewExamples: [ { val: 25, from: 'hour', to: 'year' } ],
  detailedContent: { whatIsIt: 'Converts hourly wages to annual income.', whoIsItFor: 'Freelancers and contractors.' },
  icon: <Briefcase size={18} strokeWidth={1.5} />,
  units: [
      { ...salaryUnits[0] }, // Hour (Default From)
      { ...salaryUnits[5] }, // Year (Default To)
      ...salaryUnits.slice(1, 5)
  ]
};

// ============================================================================
// 3. DATE & TIME TOOLS (SPLIT)
// ============================================================================

// Tool 1: Date Difference
export const DATE_DIFFERENCE: ExtendedConverterDef = {
  id: 'date_diff',
  name: 'Date Difference',
  category: 'date',
  accentColor: '#9333EA',
  subtitle: 'Calculate duration between today and a date.',
  description: 'Find the time elapsed or remaining between today and another date.',
  metaDescription: 'Calculate years, months, and days between dates.',
  aboutText: 'Enter a date to see exactly how long it is from today, broken down into years, months, and days.',
  previewExamples: [ { val: '2026-01-01', from: 'date_point', to: 'duration_text' } ],
  detailedContent: { whatIsIt: 'Calculates the full calendar duration.', whoIsItFor: 'Event planners.' },
  icon: <Calendar size={18} strokeWidth={1.5} />,
  units: [
    { id: 'date_point', name: 'Target Date', symbol: 'Date', inputType: 'date' },
    { id: 'duration_text', name: 'Duration Text', symbol: 'Text', inputType: 'number' } // Output only
  ]
};

// Tool 2: Days From Now
export const DAYS_FROM_NOW: ExtendedConverterDef = {
  id: 'days_from_now',
  name: 'Days From Now',
  category: 'date',
  accentColor: '#9333EA',
  subtitle: 'Find the date X days from today.',
  description: 'Calculate what date it will be in X days.',
  metaDescription: 'Add days to today to find a future date.',
  aboutText: 'Simple calculator to find a future or past date by adding/subtracting days from today.',
  previewExamples: [ { val: 30, from: 'days_offset', to: 'date_point' } ],
  detailedContent: { whatIsIt: 'Adds a duration to the current date.', whoIsItFor: 'Schedulers.' },
  icon: <Hourglass size={18} strokeWidth={1.5} />,
  units: [
    { id: 'days_offset', name: 'Days Offset', symbol: 'Days', inputType: 'number' },
    { id: 'date_point', name: 'Result Date', symbol: 'Date', inputType: 'date' }
  ]
};

// Tool 3: Days From Date
export const DAYS_FROM_DATE: ExtendedConverterDef = {
  id: 'days_from_date',
  name: 'Days From Date',
  category: 'date',
  accentColor: '#9333EA',
  subtitle: 'Count total days since or until a date.',
  description: 'Get the total number of days between today and a specific date.',
  metaDescription: 'Count days from today to a target date.',
  aboutText: 'Calculates the absolute number of days between today and your target date.',
  previewExamples: [ { val: '2025-01-01', from: 'date_point', to: 'days_count' } ],
  detailedContent: { whatIsIt: 'Counts total days between dates.', whoIsItFor: 'Project tracking.' },
  icon: <History size={18} strokeWidth={1.5} />,
  units: [
    { id: 'date_point', name: 'Target Date', symbol: 'Date', inputType: 'date' },
    { id: 'days_count', name: 'Total Days', symbol: 'Days', inputType: 'number' }
  ]
};

// Tool 4: Days in a Year
export const DAYS_IN_YEAR: ExtendedConverterDef = {
  id: 'days_in_year',
  name: 'Days in a Year',
  category: 'date',
  accentColor: '#9333EA',
  subtitle: 'Check if a year has 365 or 366 days.',
  description: 'Determine if a specific year is a leap year.',
  metaDescription: 'Calculate how many days are in a specific year.',
  aboutText: 'Enter a year to instantly see if it is a leap year (366 days) or a common year (365 days).',
  previewExamples: [ { val: 2024, from: 'year_input', to: 'days_count' } ],
  detailedContent: { whatIsIt: 'Determines leap years.', whoIsItFor: 'Calendar calculations.' },
  icon: <Sun size={18} strokeWidth={1.5} />,
  units: [
    { id: 'year_input', name: 'Year', symbol: 'Year', inputType: 'number' },
    { id: 'days_count', name: 'Days in Year', symbol: 'Days', inputType: 'number' }
  ]
};


// ============================================================================
// EXPORTS
// ============================================================================

export const UNIT_TOOLS = [
  LENGTH_CONVERTER,
  WEIGHT_CONVERTER,
  TEMP_CONVERTER,
  AREA_CONVERTER,
  VOLUME_CONVERTER,
  SPEED_CONVERTER,
  TIME_CONVERTER,
  DATA_CONVERTER
];

export const FINANCE_TOOLS = [
  SALARY_TO_HOURLY,
  HOURLY_TO_ANNUAL
];

export const DATE_TOOLS = [
  DATE_DIFFERENCE,
  DAYS_FROM_NOW,
  DAYS_FROM_DATE,
  DAYS_IN_YEAR
];

export const ALL_TOOLS = [
  ...UNIT_TOOLS,
  ...FINANCE_TOOLS,
  ...DATE_TOOLS
];

export const ALL_CONVERTERS = ALL_TOOLS;
export const APP_NAME = "Global Unit Converter";