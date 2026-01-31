/**
 * Returns the sigmoid of a given number.
 *
 * The sigmoid function is an S-shaped curve that maps any real-valued
 * number to a value between 0 and 1.
 * 
 * It is often used in machine learning models as an activation function
 * for hidden layers.
 *
 * @param x - The number to sigmoid.
 * @returns The sigmoid of x.
 */
export default function sigmoid( x: number )
{
	return 1 / ( 1 + Math.exp( -x ));
}
