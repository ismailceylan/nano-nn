import type { Vector } from "./create-vector";

/**
 * Multiply two vectors element-wise.
 * 
 * @param vector1 - The first vector.
 * @param vector2 - The second vector.
 * @returns A new vector with the element-wise product of the two input vectors.
 */
export default function multiplyVectors( vector1: Vector, vector2: Vector )
{
	return vector1.map(( x, index ) => x * vector2[ index ]);
}
