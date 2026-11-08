/**
 * The tax-benefit model behind the Rechner, the hero card and Ablauf step 03.
 *
 * Implemented exactly as specified in the design handoff (README, "Calculator
 * Formula"). It is a deliberately simplified model: 100 % financing, 3.7 %
 * interest, 2 % repayment, 5 % declining-balance depreciation for new builds.
 * The disclaimer shown next to every result says so. Have a tax adviser sign
 * the model off before launch, and before changing any constant here.
 */

export type YearResult = {
  rent: number;
  interest: number;
  afa: number;
  loss: number;
  benefit: number;
};

export type CalcResult = YearResult & {
  /** Running costs (Bewirtschaftung) per year. */
  costs: number;
  /** Repayment (Tilgung) per year. */
  tilg: number;
  /** Marginal tax rate as a fraction. */
  rate: number;
  years: YearResult[];
  /** Tax benefit summed over ten years. */
  total: number;
  /** Eigenaufwand / Monat. */
  monthly: number;
  /** Tilgung / Monat. */
  tilgMonthly: number;
};

/** Marginal tax rate on a simplified German income-tax curve. */
export function marginalRate(income: number): number {
  const z = income * 0.88; // taxable income
  if (z <= 12096) return 0;
  if (z <= 17443) return 0.14 + ((z - 12096) / 5347) * 0.1;
  if (z <= 68480) return 0.24 + ((z - 17443) / 51037) * 0.18;
  return z <= 277825 ? 0.42 : 0.45;
}

/**
 * @param income  gross annual income (or profit) in €
 * @param price   purchase price of the property in €
 * @param newBuild  Neubau (true) or Bestand (false)
 */
export function calculate(income: number, price: number, newBuild: boolean): CalcResult {
  const rate = marginalRate(income);
  const loan = price * 1.08;
  const tilg = loan * 0.02;
  const costs = price * 0.004;
  const years: YearResult[] = [];

  for (let y = 0; y < 10; y++) {
    const rent = price * (newBuild ? 0.036 : 0.042) * Math.pow(1.02, y);
    const interest = (loan - tilg * y) * 0.037;
    const afa = newBuild ? price * 0.8 * Math.pow(0.95, y) * 0.05 : price * 0.8 * 0.02;
    const loss = Math.max(0, interest + afa + costs - rent);
    years.push({ rent, interest, afa, loss, benefit: loss * rate });
  }

  const first = years[0];
  return {
    ...first,
    costs,
    tilg,
    rate,
    years,
    total: years.reduce((sum, y) => sum + y.benefit, 0),
    monthly: Math.abs(first.rent - first.interest - tilg - costs + first.benefit) / 12,
    tilgMonthly: tilg / 12,
  };
}

/** Rounded to 10 €, German formatting: 12340 → "12.340 €". */
export function eur(n: number): string {
  return `${(Math.round(n / 10) * 10).toLocaleString('de-DE')} €`;
}

export type CaseExample = {
  label: string;
  /** Shown in the case note, e.g. "140.000 € brutto". */
  sub: string;
  income: number;
  price: number;
};

/** The three worked examples. All use Neubau. */
export const CASES: CaseExample[] = [
  { label: 'Unternehmer', sub: '220.000 € Gewinn', income: 220000, price: 650000 },
  { label: 'Leitende Angestellte', sub: '140.000 € brutto', income: 140000, price: 450000 },
  { label: 'Normalverdiener', sub: '65.000 € brutto', income: 65000, price: 260000 },
];

/** Case 02 is the default and the hero's example. */
export const DEFAULT_CASE = 1;

/** Case 02, precomputed for the hero card and Ablauf step 03. */
export const HERO_RESULT = calculate(CASES[DEFAULT_CASE].income, CASES[DEFAULT_CASE].price, true);

export const DISCLAIMER =
  'Vereinfachte Modellrechnung: 100 % Finanzierung, 3,7 % Zins, 2 % Tilgung, AfA Neubau 5 % degressiv. Keine Steuerberatung.';
