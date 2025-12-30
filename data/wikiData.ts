
export interface WikiEntry {
  id: string;
  name: string;
  symbol: string;
  category: string;
  system: string;
  definition: string;
  history: string;
  usage: string;
  baseUnit?: string;
  facts: { label: string; value: string }[];
}

export const UNIT_WIKI: Record<string, WikiEntry> = {
  m: {
    id: 'm',
    name: 'Meter',
    symbol: 'm',
    category: 'Length',
    system: 'SI (Base Unit)',
    definition: 'The meter is the base unit of length in the International System of Units (SI). It is defined by taking the fixed numerical value of the speed of light in vacuum, c, to be 299,792,458 when expressed in the unit m·s⁻¹.',
    history: 'Originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole along a great circle. In 1889, it was redefined by the International Prototype of the Metre, a platinum-iridium bar. In 1960, the definition was updated to a specific number of wavelengths of krypton-86 radiation. The current definition, based on the speed of light, was adopted in 1983 to improve precision.',
    usage: 'The meter is used globally for scientific, engineering, and general measurements. It serves as the foundation for the metric system, scaling up to kilometers for distance and down to millimeters or nanometers for precision engineering.',
    facts: [
      { label: 'Dimension', value: 'L' },
      { label: 'Symbol', value: 'm' },
      { label: 'System', value: 'Metric (SI)' },
      { label: 'Defined', value: '1983 (Current)' },
    ]
  },
  kg: {
    id: 'kg',
    name: 'Kilogram',
    symbol: 'kg',
    category: 'Weight',
    system: 'SI (Base Unit)',
    definition: 'The kilogram is the base unit of mass in the International System of Units (SI). It is defined by taking the fixed numerical value of the Planck constant, h, to be 6.62607015×10⁻³⁴ when expressed in the unit J·s.',
    history: 'Originally defined in 1795 as the mass of one liter of water at the melting point of ice. From 1889 to 2019, it was defined by the International Prototype of the Kilogram (IPK), a platinum-iridium cylinder kept in Sèvres, France. In May 2019, it was redefined based on physical constants to ensure long-term stability.',
    usage: 'The kilogram is the primary unit for mass in science, industry, and daily commerce worldwide, with the notable exception of the United States where the pound is commonly used.',
    facts: [
      { label: 'Dimension', value: 'M' },
      { label: 'Symbol', value: 'kg' },
      { label: 'System', value: 'Metric (SI)' },
      { label: 'Defined', value: '2019 (Current)' },
    ]
  },
  c: {
    id: 'c',
    name: 'Celsius',
    symbol: '°C',
    category: 'Temperature',
    system: 'SI Derived',
    definition: 'The degree Celsius is a unit of temperature on the Celsius scale, originally known as the centigrade scale. The degree Celsius can refer to a specific temperature on the Celsius scale or a unit to indicate a difference between two temperatures.',
    history: 'Proposed by Swedish astronomer Anders Celsius in 1742. Interestingly, his original scale set 0° as the boiling point of water and 100° as the freezing point. This was reversed by Carolus Linnaeus and others shortly after Celsius\'s death to the modern standard.',
    usage: 'Celsius is the standard unit of temperature for practically all of the world, used in meteorology, healthcare, and industry. The Kelvin scale is preferred in scientific thermodynamics.',
    facts: [
      { label: 'Dimension', value: 'Θ' },
      { label: 'Symbol', value: '°C' },
      { label: 'System', value: 'Metric' },
      { label: 'Freezing Pt', value: '0 °C' },
      { label: 'Boiling Pt', value: '100 °C' },
    ]
  },
  // Generic fallback for others can be handled in component
};
