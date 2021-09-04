/**
 * Some useful math utilities
 */
export class MathUtils {
	/**
	 * Calculate the greatest common divisor of the number a and b.
	 * @param a number a
	 * @param b number b
	 * @returns the greatest common divisor
	 */
	static gcd(a: number, b: number): number {
		if (a === 0 || b === 0) return Math.max(a + b, 1);
		while (b !== 0) {
			const r = b;
			b = a % b;
			a = r;
		}
		return a;
	}

	/**
	 * Calculate the least common multiple  of the number a and b.
	 * @param a number a
	 * @param b number b
	 * @returns the least common multiple
	 */
	static lcm(a: number, b: number): number {
		return Math.abs(a * b) / MathUtils.gcd(a, b);
	}
}
