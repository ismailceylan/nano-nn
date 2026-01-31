import type { Network } from "./create-network";
import type { Vector } from "./utils/create-vector";
import zeroLikeNetwork from "./zero-like-network";
import forward from "./forward";
import { tanhPrime, sigmoidPrime, reluPrime } from "./activations";

/**
 * Calculates the gradients of the loss function with respect to the
 * weights and biases of a neural network using backpropagation.
 * 
 * @param network - The neural network to calculate the gradients for.
 * @param input - The input vector to the network.
 * @param target - The target output vector of the network.
 * @returns An object containing the gradients of the weights and biases of the network.
 */
export default function backprop( network: Network, input: Vector, target: Vector )
{
	const { weights, loss } = network;
	const { activations, zs } = forward( network, input );
	const L = activations.length - 1; // son katman indexi
	const aL = activations[ L ];
	const deltas = new Array( L );
	const { weightGrads, biasGrads } = zeroLikeNetwork( network );
	const lastActivation = network.activations[ L - 1 ];

	deltas[ L - 1 ] = aL.map(( a_j, j ) =>
	{
		if( lastActivation == "softmax" )
		{
			if( loss === "crossEntropy" )
			{
				return a_j - target[ j ];
			}
		}
		else
		{
			const dC_da = 2 * ( a_j - target[ j ]); // derivative of MSE
			const x = zs[ L - 1 ][ j ];
		
			if( lastActivation === "sigmoid" ) return dC_da * sigmoidPrime( x );
			if( lastActivation === "tanh" )    return dC_da * tanhPrime( x );
			if( lastActivation === "relu" )    return dC_da * reluPrime( x );
			if( lastActivation === "linear" )  return dC_da;

			return dC_da; // linear
		}
	});

	for( let l = L - 2; l >= 0; l-- )
	{
		const wNext = weights[ l + 1 ]; // [nextOut][thisOut]
		const deltaNext = deltas[ l + 1 ];
		const a = activations[ l + 1 ]; // activation of this layer
		const activation = network.activations[ l ];

		deltas[ l ] = a.map(( a_j, j ) =>
		{
			let sum = 0;

			for( let k = 0; k < deltaNext.length; k++ )
			{
				sum += wNext[ k ][ j ] * deltaNext[ k ];
			}

			if( activation === "sigmoid" ) return sigmoidPrime( zs[ l ][ j ]) * sum;
			if( activation === "tanh" ) return tanhPrime( zs[ l ][ j ]) * sum;
			if( activation === "relu" ) return reluPrime( zs[ l ][ j ]) * sum;
			
			return sum; // linear
		});
	}

	for( let l = 0; l < L; l++ )
	{
		const delta = deltas[ l ];
		const aPrev = activations[ l ];

		// Bias grad
		for( let j = 0; j < delta.length; j++ )
		{
			biasGrads[ l ][ j ] += delta[ j ];
		}

		// Weight grad
		for( let j = 0; j < network.weights[ l ].length; j++ )
		{
			for( let i = 0; i < network.weights[ l ][ j ].length; i++ )
			{
				weightGrads[ l ][ j ][ i ] += delta[ j ] * aPrev[ i ];
			}
		}
	}

	return { weightGrads, biasGrads }
}

/**
 * The gradients of the loss function with respect to the weights and biases.
 */
export type BackpropSample =
{
	/** The gradients of the loss function with respect to the weights. */
	weightGrads: number[][][],
	/** The gradients of the loss function with respect to the biases. */
	biasGrads: number[][]
}
