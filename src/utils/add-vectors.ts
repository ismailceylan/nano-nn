import type { Vector } from "./create-vector";

/**
 * Adds two vectors element-wise.
 * 
 * @param vector1 - The first vector.
 * @param vector2 - The second vector.
 * @returns A new vector with the element-wise sum of the two input vectors.
 */
export default function addVectors( vector1: Vector, vector2: Vector ): Vector
{
	return vector1.map(( vec1Val, vec1Ind ) =>
		vec1Val + vector2[ vec1Ind ]
	);
}
