import type { Vector } from "./utils/create-vector";
import type { Network } from "./create-network";
import backprop from "./backprop";
import applyGradients from "./apply-gradients";
import { mseLoss, crossEntropyLoss } from "./loss";
import forward from "./forward";
import accuracy from "./accuracy";
import applyGradientsWithAdam from "./apply-gradients-with-adam";

/**
 * Trains a neural network using the given data.
 *
 * @param network - The neural network to train.
 * @param X - The input vectors.
 * @param Y - The target vectors.
 * @param options - The training options.
 * @returns {Network} The trained neural network.
 */
export default function train(
	network: Network,
	X: Vector[],
	Y: Vector[],
	{ epochs = 1000, learningRate = 0.5, logEvery = 100, showAccuracy = false } = {}
)
{
	for( let epoch = 1; epoch <= epochs; epoch++ )
	{
		let totalLoss = 0;

		for( let idx = 0; idx < X.length; idx++ )
		{
			const x = X[ idx ];
			const y = Y[ idx ];

			const { activations } = forward( network, x );
			const pred = activations[ activations.length - 1 ];

			totalLoss += crossEntropyLoss( pred, y );

			const grads = backprop( network, x, y );
			
			applyGradientsWithAdam( network, grads, learningRate );
			// applyGradients( network, grads, learningRate, 1 );
		}

		const avgLoss = totalLoss / X.length;

		if( epoch % logEvery === 0 )
		{
			if( showAccuracy )
			{
				const acc = accuracy( network, X, Y );
				console.log( `Epoch ${ epoch }, loss=${ avgLoss.toFixed( 6 )}, accuracy=${ acc.toFixed( 2 )}` );
			}
			else
			{
				console.log( `Epoch ${ epoch }, loss=${ avgLoss.toFixed( 6 )}` );
			}
		}
	}

	return network;
}
