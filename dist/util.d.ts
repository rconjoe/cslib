/**
 * Compare two values and return `true` if they are equal, considering cases where the first value might be undefined or a boolean.
 * @template T
 * @template U
 * @param {T} var1 - The first value to compare.
 * @param {U} var2 - The second value to compare.
 * @returns {boolean} - `true` if the values are equal, `false` otherwise.
 */
export declare function compare<T, U>(var1: T, var2: U): boolean;
/**
 * Wraps a function with error handling to return the result of the function or `false` in case of an error.
 * @template T
 * @param {T} fn - The function to wrap.
 */
export declare function safe<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> | false;
