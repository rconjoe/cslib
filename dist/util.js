/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export function compare(var1, var2) {
    return var1 === undefined || var1 === (typeof var1 === "boolean" ? var2 || false : var2);
}
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
export function float(literal, fractionDigits = 2) {
    return parseFloat(literal.toFixed(fractionDigits));
}
