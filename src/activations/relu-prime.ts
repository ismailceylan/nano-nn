/**
 * Computes the derivative of the ReLU (Rectified Linear Unit) of a given number.
 * 
 * The derivative of the ReLU is 1 for positive values and 0 for negative values.
 * 
 * @param x - The number to compute the derivative of the ReLU of.
 * @returns The derivative of the ReLU of the given number.
 */
export default function reluPrime( x: number )
{
	return x > 0
		? 1
		: 0;
}
