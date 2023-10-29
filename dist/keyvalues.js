/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * A simple Valve Key Value parser.
 * @return {any}
 */
export function parse(data) {
    data = data.replace(/\[[\$!][^\]]+\]/g, "");
    let index = 0;
    function skipWhitespace() {
        while (data[index] && data[index].match(/[\s\t\r\n]/)) {
            index += 1;
        }
        if (data[index] === "/" && data[index + 1] === "/") {
            while (data[index] && data[index] !== "\n") {
                index += 1;
            }
            skipWhitespace();
        }
    }
    function parseString() {
        if (data[index] === '"') {
            index += 1;
            let value = "";
            while (data[index] &&
                (data[index] !== '"' ||
                    (data[index] === '"' && data[index - 1] === "\\"))) {
                value += data[index];
                index += 1;
            }
            if (data[index] !== '"') {
                throw new Error("Bad end of string.");
            }
            index += 1;
            return value;
        }
        return "";
    }
    function parseValue() {
        if (data[index] === '"') {
            return parseString();
        }
        if (data[index] === "{") {
            index += 1;
            return parsePairs();
        }
        if (data[index] === "}") {
            return "";
        }
        console.log(data[index]);
        throw new Error(`Unexpected character at index ${index}.`);
    }
    function parsePairs() {
        const pairs = [];
        while (data[index]) {
            if (data[index] === "}") {
                index += 1;
                return pairs;
            }
            skipWhitespace();
            const key = parseString();
            skipWhitespace();
            const value = parseValue();
            skipWhitespace();
            pairs.push([key, value]);
        }
        return pairs;
    }
    function walk(context, pairs) {
        return pairs.reduce((object, pair) => {
            const [key, value] = pair;
            if (object[key] && !Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            const newValue = typeof value === "string" ? value : walk({}, value);
            if (Array.isArray(object[key])) {
                object[key].push(newValue);
            }
            else {
                object[key] = newValue;
            }
            return object;
        }, context);
    }
    return walk({}, parsePairs());
}
