import type { Vector } from "./create-vector";

/**
 * Scales a vector by a given scale.
 * 
 * @param vector - The vector to be scaled.
 * @param scale - The scale to apply to the vector.
 * @returns A new vector with the scaled values.
 * @example
 * scaleVector([1, 2, 3], 2) // [2, 4, 6]
 */
export default function scaleVector( vector: Vector, scale: number )
{
	return vector.map( x => x * scale );
}
