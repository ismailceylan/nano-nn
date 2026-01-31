import type { Vector } from "./utils/create-vector";
import { createMatrix, createVector, heWeight, randomBias } from "./utils";

/**
 * Creates a neural network with the specified layer sizes.
 * 
 * @param layerSizes - An array of layer sizes.
 * @returns An object containing the layer sizes, weights and biases of the network.
 */
export default function createNetwork(
	{ layerSizes, activations, loss }:
	{ layerSizes: Vector, activations: Activator[], loss: Loss }
): Network
{
	const weights: Vector[][] = [];
	const biases: Vector[] = [];
	const latestActivator = activations[ activations.length - 1 ];
	const layerActivatorsDiff = activations.length - layerSizes.length;

	if( latestActivator === "softmax" && loss !== "crossEntropy" )
	{
		console.warn( "softmax should only be used with crossEntropy!" );
	}

	if( layerActivatorsDiff < -1 )
	{
		throw new Error( `need to define ${ Math.abs( layerActivatorsDiff ) - 1 } more activators` );
	}

 	for( let l = 0; l < layerSizes.length - 1; l++ )
	{
		const inSize = layerSizes[ l ];
		const outSize = layerSizes[ l + 1 ];

		const w = createMatrix( outSize, inSize, () => heWeight( inSize, outSize ));
		const b = createVector( outSize, () => randomBias());

		weights.push( w );
		biases.push( b );
	}

	return { layerSizes, weights, biases, activations, loss };
}

export type Activator = "linear" | "sigmoid" | "softmax" | "tanh" | "relu";
export type Loss = "mse" | "crossEntropy";

/**
 * A neural network.
 */
export type Network = 
{
	/** The layer sizes of the network. */
	layerSizes: Vector;
	/** The weights of the network. */
	weights: Vector[][];
	/** The biases of the network. */
	biases: Vector[];
	/** The activation methods of the network. */
	activations?: ("linear"|"sigmoid"|"softmax"|"tanh"|"relu")[];
	/** The loss function of the network. */
	loss: "mse"|"crossEntropy";
	/** The Adam state of the network. */
	adam?: AdamState;
}

/**
 * Adam state.
 */
export type AdamState =
{
	/** momentum for weights */
	m_w: Vector[][];
	/** RMS for weights */
	v_w: Vector[][];
	/** momentum for biases */
	m_b: Vector[];
	/** RMS for biases */
	v_b: Vector[];
	/** number of iteration */
	t: number;
}
