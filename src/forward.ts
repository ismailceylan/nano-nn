import type { Vector } from "./utils/create-vector";
import type { Network } from "./create-network";
import { multiplyMatrixWithVector, addVectors } from "./utils";
import { relu, sigmoid, softmax, tanh } from "./activations";

/**
 * Forward pass for a neural network.
 * 
 * This function takes a neural network and an input vector, and returns
 * the activations and the weighted sums at each layer.
 * 
 * @param network - The neural network to perform the forward pass on.
 * @param input - The input vector to the network.
 * @returns An object containing the activations and weighted sums at each layer.
 * @example
 * const input = [1, 2, 3];
 * const network = createNetwork([3, 2, 1]);
 * const result = forward( network, input );
 * console.log( result.activations ); // [[1, 2, 3], [0.5, 0.5]]
 * console.log( result.zs ); // [[[-0.5, 0.5], [-0.5, 0.5]]
 */
export default function forward( network: Network, input: Vector )
{
	const { weights, biases } = network;
	const activations = [ input ]; // a[0] = input
	const zs: Vector[] = []; // z[l] = w * a[l] + b

	for( let l = 0; l < weights.length; l++ )
	{
		const w = weights[ l ];
		const b = biases[ l ];
		const prevA = activations[ l ]; // a[l]
		const z = addVectors( multiplyMatrixWithVector( w, prevA ), b ); // z = W*a + b
		const activation = network.activations[ l ];
		const a = (() =>
		{
			switch( activation )
			{
				case "softmax": return softmax( z );
				case "tanh":    return z.map( tanh );
				case "sigmoid": return z.map( sigmoid );
				case "relu":    return z.map( relu );
				case "linear":  return z;
				default: throw new Error( `Unknown activation: ${ activation }` );
			}
		})();

		zs.push( z );
		activations.push( a );
	}

	return { activations, zs }
}
