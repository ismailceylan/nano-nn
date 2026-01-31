import type { Vector } from "./create-vector";

/**
 * Subtracts vector2 from vector1 element-wise.
 * 
 * @param vector1 - The first vector.
 * @param vector2 - The second vector.
 * @returns A new vector with the element-wise difference of the two input vectors.
 */
export default function subVectors( vector1: Vector, vector2: Vector )
{
	return vector1.map(( x, i ) =>
		x - vector2[ i ]
	);
}
