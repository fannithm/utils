import { IFraction } from ".";

export class DenominatorZeroError extends Error {
	name = 'DenominatorZeroError';
	message: string;

	constructor(frac: IFraction) {
		super();
		this.message = `Denominator cannot be zero: [${frac.toString()}]`;
	}
}