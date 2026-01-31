/**
 * Creates a 2D matrix filled with values returned by the init function.
 * 
 * @param rows - The number of rows in the matrix.
 * @param cols - The number of columns in the matrix.
 * @param init - A function that takes row and column indices as arguments and returns the initial value for that position. Defaults to (r, c) => 0.
 * @returns The created matrix.
 */
export default function createMatrix(
	rows: number,
	cols: number,
	init = ( r: number, c: number ) => 0
)
{
	return Array.from({ length: rows }, function( _, r )
	{
		return Array.from({ length: cols }, ( _, c ) =>
			init(r, c)
		);
	});
}
