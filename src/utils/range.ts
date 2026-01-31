/**
 * Returns an array of numbers from 0 to n-1.
 * 
 * @param n - The length of the array.
 * @returns An array of numbers from 0 to n-1.
 * @example
 * range(5) // [0, 1, 2, 3, 4]
 */
export default function range( n: number )
{
	return Array.from({ length: n }, ( _, i ) => i );
}
