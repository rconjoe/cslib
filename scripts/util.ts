/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { existsSync, readFileSync, writeFileSync } from "fs";
import { decode as htmlEntitiesDecode } from "html-entities";
import { resolve } from "path";

export function writeJson(path: string, contents: any) {
    const file = resolve(process.cwd(), path);
    const stringified = JSON.stringify(contents);
    writeFileSync(file, stringified, "utf-8");
}

export function readJson<T>(path: string, fallback?: T) {
    const file = resolve(process.cwd(), path);
    if (fallback !== undefined && !existsSync(file)) {
        return fallback;
    }
    return JSON.parse(readFileSync(file, "utf-8")) as T;
}

export function replaceInFile(path: string, pattern: RegExp, replaceValue: string) {
    const file = readFileSync(path, "utf-8");
    writeFileSync(path, file.replace(pattern, replaceValue), "utf-8");
}

export function writeTxt(path: string, contents: string) {
    const file = resolve(process.cwd(), path);
    writeFileSync(file, contents, "utf-8");
}

export function readTxt(path: string) {
    const file = resolve(process.cwd(), path);
    return readFileSync(file, "utf-8");
}

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchText(url: string) {
    url = htmlEntitiesDecode(url);
    console.log(`GET ${url}`);
    return (await fetch(url)).text();
}

export function dedupe<T>(array: T[]) {
    return [...new Set(array)];
}

export function push<T, U extends Record<string | number, U[]>>(obj: T, key: string | number, value: any) {
    if (!obj[key]) {
        obj[key] = [];
    }
    if (obj[key].includes(value)) {
        return;
    }
    obj[key].push(value);
}
