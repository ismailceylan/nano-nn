import type { Vector } from "./create-vector";

/**
 * Multiply a matrix with a vector.
 * 
 * @param matrix - A 2D matrix to multiply with the vector.
 * @param vector - A vector to multiply the matrix with.
 * @returns A new vector with the element-wise product of the matrix and vector.
 */
export default function multiplyMatrixWithVector( matrix: number[][], vector: Vector )
{
	return matrix.map( row =>
		row.reduce(( sum, w, i ) => sum + w * vector[ i ], 0 )
	);
}
