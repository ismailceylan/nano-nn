import type { Network } from "./create-network";
import type { Vector } from "./utils/create-vector";

/**
 * Returns a new network with all the weights and biases set to zero.
 * 
 * This is useful for calculating the gradients of the loss function
 * with respect to the weights and biases.
 * 
 * @param network - The network to create a zero-like version of.
 * @returns A new network with all the weights and biases set to zero.
 */
export default function zeroLikeNetwork( network: Network ): ZeroLikeNetwork
{
	return {
		weightGrads: network.weights.map( w =>
			w.map( row =>
				row.map(() => 0 )
			)
		),

		biasGrads: network.biases.map( b =>
			b.map(() => 0 )
		),
	}
}

/**
 * A network with all the weights and biases set to zero.
 */
export type ZeroLikeNetwork =
{
	/** The gradients of the loss function with respect to the weights. */
	weightGrads: Vector[][];
	/** The gradients of the loss function with respect to the biases. */
	biasGrads: Vector[];
}
