/**
 * Computes the ReLU (Rectified Linear Unit) of a given number.
 * 
 * ReLU is an activation function often used in neural networks.
 * It is defined as f(x) = max(0, x) and is used to
 * introduce non-linearity into the network.
 * 
 * @param x - The number to compute the ReLU of.
 * @returns The ReLU of the given number.
 * @example
 * relu(-1) // 0
 * relu(0) // 0
 * relu(1) // 1
 */
export default function relu( x: number )
{
	return Math.max( 0, x );
}
