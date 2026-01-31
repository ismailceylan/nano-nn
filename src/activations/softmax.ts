import { Vector } from "../utils/create-vector";

/**
 * Computes the softmax of a given vector.
 * 
 * Softmax is often used in the output layer of a neural network
 * to produce a probability distribution over all classes.
 * 
 * This function takes care of overflow protection by subtracting the
 * maximum value of the input vector from all its elements.
 * 
 * This prevents the computation of Math.exp from overflowing.
 * 
 * @param vector - The input vector to compute the softmax of.
 * @returns The softmax of the input vector.
 * @example
 * softmax([1, 2, 3]) // [0.09003057372943705, 0.244728998398398, 0.664240718872165]
 */
export default function softmax( vector: Vector ): Vector
{
	const max = Math.max( ...vector ); // overflow protection
	const exp = vector.map( v => Math.exp( v - max ));
	const sum = exp.reduce(( a, b ) => a + b, 0 );
	
	return exp.map( v => v / sum ); // normalize, sums = 1
}
