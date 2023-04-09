/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
export function compare(var1, var2) {
    return (var1 === undefined ||
        var1 === (typeof var1 === "boolean" ? var2 || false : var2));
}
