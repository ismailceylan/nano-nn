/**
 * Computes the derivative of the hyperbolic tangent of a given number.
 * 
 * @param x - the number to compute the derivative of the hyperbolic tangent of.
 * @returns the derivative of the hyperbolic tangent of the given number.
 * @example
 * tanhPrime(0.5) // 0.527636118498398
 */
export default function tanhPrime( x: number ): number
{
	const t = Math.tanh( x );
	return 1 - t * t;
}
