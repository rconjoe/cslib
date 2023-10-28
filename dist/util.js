/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
/**
 * Compare two values and return `true` if they are equal, considering cases where the first value might be undefined or a boolean.
 * @template T
 * @template U
 * @param {T} var1 - The first value to compare.
 * @param {U} var2 - The second value to compare.
 * @returns {boolean} - `true` if the values are equal, `false` otherwise.
 */
export function compare(var1, var2) {
    return (var1 === undefined ||
        var1 === (typeof var1 === "boolean" ? var2 || false : var2));
}
/**
 * Wraps a function with error handling to return the result of the function or `false` in case of an error.
 * @template T
 * @param {T} fn - The function to wrap.
 */
export function safe(fn) {
    return function safe(...args) {
        try {
            return fn(...args);
        }
        catch {
            return false;
        }
    };
}
