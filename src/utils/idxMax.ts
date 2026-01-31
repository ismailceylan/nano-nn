import type { Vector } from "./create-vector";

/**
 * Returns the index of the maximum item in the given array.
 * 
 * @param items The array to find the maximum item in.
 * @returns The index of the maximum item.
 */
export default function idxMax( items: Vector )
{
	return items.indexOf( Math.max( ...items ));
}
