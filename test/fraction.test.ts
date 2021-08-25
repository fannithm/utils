import test from 'ava';
import { Fraction } from '../src';

test('get fraction', t => {
	const frac1 = new Fraction([1, 0, 1, 2]);
	t.deepEqual(frac1.fraction, [1, 0, 1, 2]);
	t.throws(() => {
		new Fraction([1, 0, 1, 0]);
	});
});

test('eq', t => {
	const frac1 = new Fraction([1, 0, 1, 2]);
	const frac2 = new Fraction([1, 0, 2, 4]);
	t.true(frac1.eq(frac2));
});

test('gt', t => {
	const frac1 = new Fraction([1, 0, 1, 4]);
	const frac2 = new Fraction([1, 2, 1, 4]);
	const frac3 = new Fraction([1, 0, 3, 4]);
	const frac4 = new Fraction([1, 0, 1, 2]);
	t.true(frac1.gt(frac1.opposite));
	t.true(frac2.gt(frac1));
	t.true(frac3.gt(frac1));
	t.true(frac3.gt(frac1));
	t.true(frac4.gt(frac1));
	t.false(frac1.gt(frac2));
	t.true(frac1.opposite.gt(frac3.opposite));
});

test('ge', t => {
	const frac1 = new Fraction([1, 0, 1, 2]);
	const frac2 = new Fraction([1, 0, 1, 4]);
	const frac3 = new Fraction([1, 0, 2, 4]);
	t.true(frac1.ge(frac2));
	t.true(frac1.ge(frac3));
});

test('lt', t => {
	const frac1 = new Fraction([1, 0, 1, 4]);
	const frac2 = new Fraction([1, 0, 1, 2]);
	t.true(frac1.lt(frac2));
});

test('le', t => {
	const frac1 = new Fraction([1, 0, 1, 4]);
	const frac2 = new Fraction([1, 0, 1, 2]);
	const frac3 = new Fraction([1, 0, 2, 4]);
	t.true(frac1.le(frac2));
	t.true(frac1.le(frac3));
});

test('add', t => {
	const frac1 = new Fraction([1, 0, 1, 4]);
	const frac2 = new Fraction([1, 0, 1, 2]);
	const frac3 = new Fraction([1, 0, 3, 4]);
	t.true(frac2.eq(frac1.add(frac1)));
	const frac4 = frac2.opposite;
	t.true(frac1.opposite.eq(frac4.add(frac1)));
	t.true(frac1.opposite.eq(frac1.add(frac4)));
});

test('minus', t => {
	const frac1 = new Fraction([1, 0, 1, 4]);
	const frac2 = new Fraction([1, 0, 1, 2]);
	t.true(frac2.eq(frac1.minus(frac1.opposite)));
	t.true(frac1.eq(frac1.opposite.minus(frac2.opposite)));
});

test('reduce to common denominator', t => {
	const frac1 = new Fraction([1, 0, 1, 4]);
	const frac2 = new Fraction([1, 0, 1, 2]);
	t.deepEqual(frac2.reduceToCommonDenominator(frac1).fraction, [1, 0, 2, 4]);
});

test('improper', t => {
	const frac1 = new Fraction([1, 1, 1, 2]);
	t.deepEqual(frac1.improper.fraction, [1, 0, 3, 2]);
});

test('simplified', t => {
	const frac1 = new Fraction([1, -1, -1, -2]);
	const frac2 = new Fraction([-1, 0, 3, 2]);
	t.deepEqual(frac1.simplified.fraction, frac2.simplified.fraction);
});

test('set fraction', t => {
	const frac1 = new Fraction([1, 0, 0, 1]);
	frac1.fraction = [1, 0, 1, 2];
	t.deepEqual(frac1.fraction, [1, 0, 1, 2]);
});

test('decimal', t => {
	const frac = Fraction.fromInteger(2);
	t.is(frac.decimal, 2);
});

test('opposite', t => {
	const frac1 = new Fraction([1, 0, 1, 4]);
	const frac2 = new Fraction([-1, 0, 1, 4])
	t.true(frac1.opposite.eq(frac2));
});

test('absolute', t => {
	const frac1 = new Fraction([1, 0, 1, 4]);
	const frac2 = new Fraction([-1, 0, 1, 4]);
	t.true(frac1.abs.eq(frac2.abs));
});

test('copy', t => {
	const frac = new Fraction([1, 0, 1, 4]);
	t.true(frac.copy.eq(frac));
});