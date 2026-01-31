import type { Network } from "./create-network";
import type { Vector } from "./utils/create-vector";
import { idxMax } from "./utils";
import forward from "./forward";

/**
 * Calculates the accuracy of a neural network given a set of input
 * and target vectors.
 * 
 * Accuracy is defined as the number of correctly predicted outputs
 * divided by the total number of outputs.
 * 
 * @param network - The neural network to calculate the accuracy for.
 * @param X - The input vectors to the network.
 * @param Y - The target vectors of the network.
 * @returns The accuracy of the network, in the range [0, 1].
 */
export default function accuracy( network: Network, X: Vector[], Y: Vector[])
{
	let correct = 0;

	for( let i = 0; i < X.length; i++ )
	{
		const x = X[ i ];
		const y = Y[ i ];

		const { activations } = forward( network, x );
		const out = activations[ activations.length - 1 ];

		const predIdx = idxMax( out );
		const trueIdx = idxMax( y );

		if( predIdx === trueIdx )
		{
			correct++;
		}
	}

	return correct / X.length;
}
