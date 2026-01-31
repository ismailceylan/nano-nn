/**
 * Returns the derivative of the sigmoid function at a given point.
 * 
 * The derivative of the sigmoid function represents the rate of
 * change of the output with respect to the input.
 * 
 * It is used in backpropagation to update the weights of a neural network.
 * 
 * @param a - The point at which to evaluate the derivative of the sigmoid function.
 * @returns The derivative of the sigmoid function at the given point.
 * @example
 * sigmoidPrime(0.5) // 0.375
 */
export default function sigmoidPrime( a: number )
{
	return a * ( 1 - a );
}
