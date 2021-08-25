import test from 'ava';
import { MathUtils } from '../src';

test('gcd', t => {
	t.is(MathUtils.gcd(0, 5), 5);
	t.is(MathUtils.gcd(2, 4), 2);
});

test('lcm', t => {
	t.is(MathUtils.lcm(0, 5), 0);
	t.is(MathUtils.lcm(3, 4), 12);
})