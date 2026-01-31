import type { Vector } from "./utils/create-vector";
import type { Network } from "./create-network";
import forward from "./forward";

/**
 * Predicts the output of a given network based on an input.
 *
 * @param network - The neural network to predict the output for.
 * @param input - The input vector to the network.
 * @returns The output of the network based on the input.
 */
export default function predict( network: Network, input: Vector )
{
	const { activations } = forward( network, input );
	return activations[ activations.length - 1 ];
}
