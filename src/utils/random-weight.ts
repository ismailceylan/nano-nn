import randomBetween from "./random-between";

/**
 * Generates a random weight for a neural network.
 * 
 * The weight is a float between -1 and 1, and is scaled by the square
 * root of 2 divided by the input size.
 * 
 * This is to ensure that the weights are not too large, which can cause
 * the network to learn too quickly and become unstable.
 * 
 * @param inSize - The size of the input layer.
 * @returns A random weight for the neural network.
 */
export default function randomWeight( inSize: number )
{
	return randomBetween( -1, 1 ) * Math.sqrt( 2 / inSize );
}
