const { calculateTax, calculateEffectiveRate } = require('../app/taxCalculator');

describe('calculateTax', function () {
  it('returns 0 tax for 0 income', function () {
    expect(calculateTax(0, 'single')).toBe(0);
  });

  it('taxes income within the first bracket at 10% (single)', function () {
    expect(calculateTax(10000, 'single')).toBe(1000);
  });

  it('applies progressive brackets across multiple tiers (single)', function () {
    // $50,000 single: 10% up to 11000, 12% up to 44725, 22% on remainder
    const expected = 11000 * 0.10 + (44725 - 11000) * 0.12 + (50000 - 44725) * 0.22;
    expect(calculateTax(50000, 'single')).toBeCloseTo(Math.round(expected * 100) / 100, 2);
  });

  it('taxes married filing jointly using the married brackets', function () {
    expect(calculateTax(20000, 'married')).toBe(2000);
  });

  it('throws for negative income', function () {
    expect(function () { calculateTax(-500, 'single'); }).toThrowError('Income must be a non-negative number');
  });

  it('throws for a non-numeric income', function () {
    expect(function () { calculateTax('abc', 'single'); }).toThrowError('Income must be a non-negative number');
  });

  it('throws for an unknown filing status', function () {
    expect(function () { calculateTax(50000, 'widowed'); }).toThrowError('Unknown filing status: widowed');
  });

  it('handles very high income across all brackets', function () {
    const tax = calculateTax(1000000, 'single');
    expect(tax).toBeGreaterThan(300000);
  });
});

describe('calculateEffectiveRate', function () {
  it('returns 0 for 0 income', function () {
    expect(calculateEffectiveRate(0, 'single')).toBe(0);
  });

  it('returns a sensible effective rate below the top marginal rate', function () {
    const rate = calculateEffectiveRate(60000, 'single');
    expect(rate).toBeGreaterThan(0);
    expect(rate).toBeLessThan(22);
  });
});
