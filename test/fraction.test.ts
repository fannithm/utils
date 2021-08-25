import test from 'ava';
import { Fraction } from '../src';

test('fraction', t => {
	const frac = new Fraction([1, 0, 1, 2]);
	t.deepEqual(frac.fraction, [1, 0, 1, 2]);
});

test('decimal', t => {
	const frac = new Fraction([-1, 1, 1, 4]);
	t.is(frac.decimal, -1.25);
});

test('eq', t => {
	const frac1 = new Fraction([1, 0, 1, 2]);
	const frac2 = new Fraction([1, 0, 2, 4]);
	t.true(frac1.eq(frac2));
});

test('simplified', t => {
	const frac1 = new Fraction([1, 0, 1, 2]);
	const frac2 = new Fraction([1, 0, 2, 4]);
	t.deepEqual(frac1.fraction, frac2.simplified.fraction);
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

test('gt', t => {
	const frac1 = new Fraction([1, 0, 1, 2]);
	const frac2 = new Fraction([1, 0, 1, 4]);
	t.true(frac1.gt(frac2));
});

test('ge', t => {
	const frac1 = new Fraction([1, 0, 1, 2]);
	const frac2 = new Fraction([1, 0, 1, 4]);
	const frac3 = new Fraction([1, 0, 2, 4]).simplified;
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
});