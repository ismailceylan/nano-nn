import type { Network } from "./create-network";
import type { ZeroLikeNetwork } from "./zero-like-network";

/**
 * Applies the gradients of the loss function with respect to the
 * weights and biases of a neural network.
 * 
 * @param network - The neural network to apply the gradients to.
 * @param grads - The gradients of the loss function with respect to the weights and biases.
 * @param learningRate - The learning rate of the network.
 * @param batchSize - The batch size used to calculate the gradients.
 * @returns The neural network with the gradients applied.
 */
export default function applyGradients(
	network: Network,
	grads: ZeroLikeNetwork,
	learningRate: number,
	batchSize = 1
)
{
	const { weightGrads, biasGrads } = grads;
	const { weights, biases } = network;
	const lr = learningRate / batchSize;

	for( let l = 0; l < weights.length; l++ )
	{
		for( let j = 0; j < weights[ l ].length; j++ )
		{
			// bias update
			biases[ l ][ j ] -= lr * biasGrads[ l ][ j ];

			// weight update
			for( let i = 0; i < weights[ l ][ j ].length; i++ )
			{
				weights[ l ][ j ][ i ] -= lr * weightGrads[ l ][ j ][ i ];
			}
		}
	}

	return network;
}
