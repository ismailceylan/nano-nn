/**
 * Generates a random weight for a neural network using the Xavier
 * initialization method.
 * 
 * The Xavier initialization method is a widely used method for
 * initializing the weights of a neural network.
 * 
 * It is defined as W ~ U[-sqrt(6 / (n_in + n_out)), sqrt(6 / (n_in + n_out))],
 * where n_in and n_out are the number of inputs and outputs
 * of the layer.
 * 
 * @param fanIn - The number of inputs of the layer.
 * @param fanOut - The number of outputs of the layer.
 * @returns A random weight for the neural network.
 */
export default function xavierWeight( fanIn: number, fanOut: number )
{
	const limit = Math.sqrt( 6 / ( fanIn + fanOut ));
	return Math.random() * 2 * limit - limit;
}
