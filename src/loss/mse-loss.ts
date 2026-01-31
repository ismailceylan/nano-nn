import type { Vector } from "../utils/create-vector";
import { subVectors } from "../utils";

/**
 * Computes the mean squared error (MSE) loss between two vectors.
 * 
 * @param pred - the predicted vector.
 * @param target - the target vector.
 * @returns the mean squared error loss between the two vectors.
 */
export default function mseLoss( pred: Vector, target: Vector)
{
	const diffs = subVectors( pred, target );
	const sq = diffs.map( d => d * d );
	const sum = sq.reduce(( acc, x ) => acc + x, 0 );
	
	return sum / pred.length;
}
