import type { Network } from "./create-network";
import type { Vector } from "./utils/create-vector";

const beta1 = 0.9;
const beta2 = 0.999;
const epsilon = 1e-8;

/**
 * Applies the gradients of the loss function with respect to the
 * weights and biases of a neural network using the Adam
 * optimization algorithm.
 * 
 * @param network - The neural network to apply the gradients to.
 * @param grads - The gradients of the loss function with respect to the weights and biases.
 * @param learningRate - The learning rate of the network.
 * @returns The neural network with the gradients applied.
 */
export default function applyGradientsWithAdam(
	network: Network,
	grads: { weightGrads: Vector[][]; biasGrads: Vector[]},
	learningRate: number
)
{
	initAdamState( network );

	const adam = network.adam;

	adam.t++;

	for( let l = 0; l < network.weights.length; l++ )
	{
		for( let j = 0; j < network.weights[ l ].length; j++ )
		{
			for( let i = 0; i < network.weights[ l ][ j ].length; i++ )
			{
				adam.m_w[ l ][ j ][ i ] =
					beta1 * 
					adam.m_w[ l ][ j ][ i ] + ( 1 - beta1 ) * 
					grads.weightGrads[ l ][ j ][ i ];
				
				adam.v_w[ l ][ j ][ i ] = 
					beta2 * 
					adam.v_w[ l ][ j ][ i ] + ( 1 - beta2 ) * 
					( grads.weightGrads[ l ][ j ][ i ] ** 2 );

				const mHat = adam.m_w[ l ][ j ][ i ] / ( 1 - Math.pow( beta1, adam.t ));
				const vHat = adam.v_w[ l ][ j ][ i ] / ( 1 - Math.pow( beta2, adam.t ));

      	 		 network.weights[ l ][ j ][ i ] -= learningRate * ( mHat / ( Math.sqrt( vHat ) + epsilon ));
			}
		}

		for( let j = 0; j < network.biases[ l ].length; j++ )
		{
			adam.m_b[ l ][ j ] = beta1 * adam.m_b[ l ][ j ] + ( 1 - beta1 ) * grads.biasGrads[ l ][ j ];
			adam.v_b[ l ][ j ] = beta2 * adam.v_b[ l ][ j ] + ( 1 - beta2 ) * ( grads.biasGrads[ l ][ j ] ** 2 );

			const mHatB = adam.m_b[ l ][ j ] / ( 1 - Math.pow( beta1, adam.t ));
			const vHatB = adam.v_b[ l ][ j ] / ( 1 - Math.pow( beta2, adam.t ));

			network.biases[ l ][ j ] -= learningRate * ( mHatB / ( Math.sqrt( vHatB ) + epsilon ));
		}
	}
}

/**
 * Initializes the Adam state of a neural network.
 * 
 * This function initializes the Adam state of a neural network
 * by creating a new object with the following properties:
 * m_w, v_w, m_b, v_b, and t.
 * 
 * m_w and v_w are used to store the first and second moments of the weights,
 * respectively. m_b and v_b are used to store the first and second moments
 * of the biases, respectively. t is used to store the current iteration number.
 * 
 * This function should be called before training a neural network using the Adam
 * optimization algorithm.
 */
function initAdamState( network: Network )
{
	if( ! network.adam )
	{
		network.adam =
		{
			m_w: network.weights.map( layer =>
				layer.map( row =>
					row.map(() => 0 )
				)
			),
			v_w: network.weights.map( layer =>
				layer.map( row =>
					row.map(() => 0 )
				)
			),
			m_b: network.biases.map( layer =>
				layer.map(() => 0 )
			),
			v_b: network.biases.map( layer =>
				layer.map(() => 0 )
			),
			t: 0
		}
	}
}
