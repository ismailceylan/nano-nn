import { Vector } from "../utils/create-vector";

/**
 * Computes the cross-entropy loss between two vectors.
 * 
 * @param pred - the predicted vector.
 * @param target - the target vector.
 * @returns the cross-entropy loss between the two vectors.
 */
export default function crossEntropyLoss( pred: Vector, target: Vector )
{
	const epsilon = 1e-15; // log(0) hatasını engellemek için

	return -target.reduce(
		( sum, t, i ) => sum + t * Math.log( pred[ i ] + epsilon ),
    	0
  	);
}
