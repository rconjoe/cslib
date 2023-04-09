/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
export function parse(data) {
    data = data.replace(/\[[\$!][^\]]+\]/g, "");
    var index = 0;
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
            var value = "";
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
        throw new Error("Unexpected character at index ".concat(index, "."));
    }
    function parsePairs() {
        var pairs = [];
        while (data[index]) {
            if (data[index] === "}") {
                index += 1;
                return pairs;
            }
            skipWhitespace();
            var key = parseString();
            skipWhitespace();
            var value = parseValue();
            skipWhitespace();
            pairs.push([key, value]);
        }
        return pairs;
    }
    function walk(context, pairs) {
        return pairs.reduce(function (object, pair) {
            var key = pair[0], value = pair[1];
            if (object[key] && !Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            var newValue = typeof value === "string" ? value : walk({}, value);
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
