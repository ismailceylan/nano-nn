import randomBetween from "./random-between";

/**
 * Generates a random bias for a neural network.
 * 
 * The bias is a float between -0.1 and 0.1.
 * 
 * This is to ensure that the bias is not too large, which can cause
 * the network to learn too quickly and become unstable.
 * 
 * @returns A random bias for the neural network.
 */
export default function randomBias()
{
	return randomBetween( -0.1, 0.1 );
}
