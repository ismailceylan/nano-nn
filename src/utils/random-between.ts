/**
 * Returns a random number between min and max (inclusive).
 *
 * @param min - The minimum value (inclusive) for the random number.
 * @param max - The maximum value (inclusive) for the random number.
 * @returns A random number between min and max (inclusive).
 * @example
 * randBetween(1, 5) // A random number between 1 and 5 (inclusive)
 */
export default function randomBetween( min: number, max: number )
{
	return Math.random() * ( max - min ) + min;
}
