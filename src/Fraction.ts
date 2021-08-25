import { MathUtils } from '.';

/**
 * # The Fraction class
 *
 * ## Usage
 * ```js
 * const frac = new Fraction([1, 0, 1, 2]);
 * console.log(frac.decimal); // 0.25
 * ```
 */
export class Fraction {
	private _frac: IFraction;

	/**
	 * Create a fraction
	 * @param frac See {@link IFraction}
	 */
	constructor(frac: IFraction) {
		if (frac[3] === 0) throw 'Denominator cannot be zero.';
		this._frac = frac;
	}

	/**
	 * Create a fraction from integer
	 * @param num integer
	 * @returns the fraction
	 */
	static fromInteger(num: number): Fraction {
		return new Fraction([
			num / Math.abs(num),
			Math.abs(num),
			0,
			1
		])
	}

	/**
	 * Compare if this is greater than another fraction
	 * @param frac fraction to compare
	 * @returns `true` if given fraction is greater than this
	 */
	gt(frac: Fraction): boolean {
		if (this.sign > 0 && frac.sign < 0) return true;
		else if (this.sign > 0 && frac.sign > 0) {
			if (this.integer > frac.integer) return true;
			else if (this.integer === frac.integer) {
				if (this.denominator === frac.denominator) return this.numerator > frac.numerator;
				else return this.numerator * frac.denominator > frac.numerator * this.denominator;
			} else return false;
		}
		else return !this.opposite.gt(frac.opposite);
	}

	/**
	 * Compare if this is equal to another fraction
	 * @param frac fraction to compare
	 * @returns `true` if given fraction is equal to this
	 */
	eq(frac: Fraction): boolean {
		const frac1 = this.simplified;
		const frac2 = frac.simplified;
		return frac1.sign === frac2.sign &&
			frac1.integer === frac2.integer &&
			frac1.numerator === frac2.numerator &&
			frac1.denominator === frac2.denominator;
	}

	/**
	 * Compare if this is greater than or equal to another fraction
	 * @param frac fraction to compare
	 * @returns `true` if given fraction is greater than or equal to this
	 */
	ge(frac: Fraction): boolean {
		return this.gt(frac) || this.eq(frac);
	}

	/**
	 * Compare if this is less than another fraction
	 * @param frac fraction to compare
	 * @returns `true` if given fraction is greater than or equal to this
	 */
	lt(fraction: Fraction): boolean {
		return !this.ge(fraction);
	}

	/**
	 * Compare if this is less than or equal to another fraction
	 * @param frac fraction to compare
	 * @returns `true` if given fraction is greater than or equal to this
	 */
	le(fraction: Fraction): boolean {
		return !this.gt(fraction);
	}

	/**
	 * Add this to the given fraction
	 * @param frac fraction to add
	 * @returns new fraction of the add result
	 */
	add(frac: Fraction): Fraction {
		if (this.sign === frac.sign) {
			const frac1 = this.reduceToCommonDenominator(frac);
			const frac2 = frac.reduceToCommonDenominator(this);
			return new Fraction([
				this.sign,
				frac1.integer + frac2.integer,
				frac1.numerator + frac2.numerator,
				this.denominator
			]);
		}
		return this.sign < 0 ? frac.minus(this.opposite) : this.minus(frac.opposite);
	}

	/**
	 * Minus given fraction from this
	 * @param frac fraction to minus
	 * @returns new fraction of the minus result
	 */
	minus(frac: Fraction): Fraction {
		if (this.sign === -frac.sign) return this.add(frac.opposite);
		// both positive
		if (this.sign > 0) {
			if (this.ge(frac)) {
				const frac1 = this.reduceToCommonDenominator(frac).improper;
				const frac2 = frac.reduceToCommonDenominator(this).improper;
				return new Fraction([
					this.sign,
					0,
					frac1.numerator - frac2.numerator,
					frac1.denominator
				]).simplified;
			} else {
				return frac.minus(this).opposite;
			}
		} else return this.opposite.minus(frac.opposite).opposite;
	}

	/**
	 * Reduce this and given fraction to a common denominator
	 * @param frac given fraction
	 * @returns reduced this
	 */
	reduceToCommonDenominator(frac: Fraction): Fraction {
		if (this.denominator === frac.denominator) return this.copy;
		const frac1 = this.simplified;
		const frac2 = frac.simplified;
		const lcm = MathUtils.lcm(frac1.denominator, frac2.denominator);
		return new Fraction([
			frac1.sign,
			frac1.integer,
			frac1.numerator * (lcm / frac1.denominator),
			lcm
		]);
	}

	/**
	 * Get the improper fraction
	 */
	get improper(): Fraction {
		const frac = this.copy;
		frac.numerator += frac.integer * frac.denominator;
		frac.integer = 0;
		return frac;
	}

	/**
	 * Get simplified fraction
	 */
	get simplified(): Fraction {
		const frac = this.copy;
		if (frac.integer < 0) {
			frac.integer = -frac.integer;
			frac.sign = -frac.sign;
		}
		if (frac.numerator < 0) {
			frac.numerator = -frac.numerator;
			frac.sign = -frac.sign;
		}
		if (frac.denominator < 0) {
			frac.denominator = -frac.denominator;
			frac.sign = -frac.sign;
		}
		const gcd = MathUtils.gcd(frac.numerator, frac.denominator);
		if (gcd !== 1) {
			frac.numerator = frac.numerator / gcd;
			frac.denominator = frac.denominator / gcd;
		}
		if (frac.numerator >= frac.denominator) {
			const r = Math.floor(frac.numerator / frac.denominator);
			frac.numerator -= r * frac.denominator;
			frac.denominator += r;
		}
		return frac;
	}

	/**
	 * Get the decimal of the fraction
	 */
	get decimal(): number {
		return this.sign * (this.integer + (this.numerator / this.denominator));
	}

	/**
	 * Get the fraction
	 */
	get fraction(): IFraction {
		return [...this._frac];
	}

	/**
	 * Set the fraction
	 */
	set fraction(fraction: IFraction) {
		this._frac = fraction;
	}

	/**
	 * Get the opposite value of the fraction
	 */
	get opposite(): Fraction {
		return new Fraction([-this.sign, this.integer, this.numerator, this.denominator]);
	}

	/**
	 * Get the absolute value of the fraction
	 */
	get abs(): Fraction {
		return new Fraction([1, this.integer, this.numerator, this.denominator]);
	}

	/**
	 * Get the copy of the fraction
	 */
	get copy(): Fraction {
		return new Fraction([this.sign, this.integer, this.numerator, this.denominator]);
	}

	/**
	 * Get the sign of the fraction
	 */
	get sign(): number {
		return this._frac[0];
	}

	/**
	 * Set the sign of the fraction
	 */
	set sign(sign: number) {
		this._frac[0] = sign;
	}

	/**
	 * Get the integer part of the fraction
	 */
	get integer(): number {
		return this._frac[1];
	}

	/**
	 * Get the integer part of the fraction
	 */
	set integer(integer: number) {
		this._frac[1] = integer;
	}

	/**
	 * Get the numerator of the fraction
	 */
	get numerator(): number {
		return this._frac[2];
	}

	/**
	 * Set the numerator of the fraction
	 */
	set numerator(numerator: number) {
		this._frac[2] = numerator;
	}

	/**
	 * Get the denominator of the fraction
	 */
	get denominator(): number {
		return this._frac[3];
	}

	/**
	 * Set the denominator of the fraction
	 */
	set denominator(denominator: number) {
		this._frac[3] = denominator;
	}
}

/**
 * Mixed fraction type.
 *
 * The first number is the sign of the fraction,
 * the second number is the integer part of the fraction,
 * the third number is the numerator of fraction,
 * and the last number is the denominator of the fraction.
 *
 * For example: -8/3 should be represented as [-1, 2, 2, 3]
 */
export type IFraction = [number, number, number, number];
