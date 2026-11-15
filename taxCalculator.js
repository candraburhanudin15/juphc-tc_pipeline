/**
 * taxCalculator.js
 * Progressive federal tax bracket calculator.
 * Exposed on window for browser use, and via module.exports for Jasmine/Node tests.
 */

var TAX_BRACKETS = {
  single: [
    { upTo: 11000, rate: 0.10 },
    { upTo: 44725, rate: 0.12 },
    { upTo: 95375, rate: 0.22 },
    { upTo: 182100, rate: 0.24 },
    { upTo: 231250, rate: 0.32 },
    { upTo: 578125, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 }
  ],
  married: [
    { upTo: 22000, rate: 0.10 },
    { upTo: 89450, rate: 0.12 },
    { upTo: 190750, rate: 0.22 },
    { upTo: 364200, rate: 0.24 },
    { upTo: 462500, rate: 0.32 },
    { upTo: 693750, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 }
  ]
};

/**
 * Calculates progressive tax owed for a given income and filing status.
 * @param {number} income - annual income, must be >= 0
 * @param {string} status - "single" or "married"
 * @returns {number} tax owed, rounded to 2 decimal places
 */
function calculateTax(income, status) {
  if (typeof income !== 'number' || isNaN(income) || income < 0) {
    throw new Error('Income must be a non-negative number');
  }

  var brackets = TAX_BRACKETS[status];
  if (!brackets) {
    throw new Error('Unknown filing status: ' + status);
  }

  var tax = 0;
  var lowerBound = 0;

  for (var i = 0; i < brackets.length; i++) {
    var bracket = brackets[i];
    if (income > lowerBound) {
      var taxableInThisBracket = Math.min(income, bracket.upTo) - lowerBound;
      tax += taxableInThisBracket * bracket.rate;
      lowerBound = bracket.upTo;
    } else {
      break;
    }
  }

  return Math.round(tax * 100) / 100;
}

/**
 * Calculates effective tax rate as a percentage.
 * @param {number} income
 * @param {string} status
 * @returns {number} effective rate rounded to 2 decimals (e.g. 18.42)
 */
function calculateEffectiveRate(income, status) {
  if (income === 0) return 0;
  var tax = calculateTax(income, status);
  return Math.round((tax / income) * 10000) / 100;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateTax: calculateTax, calculateEffectiveRate: calculateEffectiveRate, TAX_BRACKETS: TAX_BRACKETS };
}
if (typeof window !== 'undefined') {
  window.calculateTax = calculateTax;
  window.calculateEffectiveRate = calculateEffectiveRate;
}
