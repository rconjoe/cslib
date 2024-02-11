/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as cheerio from "cheerio";
import { basename } from "path";
import { CS_Item } from "../src/economy.js";
import { dedupe, fetchText, readJson, sleep, writeJson } from "./util.js";

export class CasesScraper {
    specialsData = readJson<Record<string, string[]>>("assets/data/case-specials.json", {});
    specials: Record<string, number[]> = {};

    async run() {
        const caseUrlRE = /"(https:\/\/csgostash\.com\/case\/\d+\/[^"]+)"/g;
        const url = "https://csgostash.com";
        const contents = await fetchText(url);
        const caseSpecials: Record<string, string[]> = {};
        const caseContents: Record<string, string[]> = {};
        const caseUrls = dedupe(Array.from(contents.matchAll(caseUrlRE)).map(([, url]) => url)).filter(
            (url) => !url.includes("?")
        );

        for (const caseUrl of caseUrls) {
            const contents = await fetchText(caseUrl);
            const specialsUrl = this.getSpecialsUrl(caseUrl, contents);
            const $ = cheerio.load(contents);
            const caseName = $("h1").text().trim();
            caseContents[caseName] = this.getNames($);
            await sleep(1000);

            if (specialsUrl) {
                const $ = cheerio.load(await fetchText(specialsUrl));
                caseSpecials[caseName] = this.getNames($);
                await sleep(1000);
            }
        }

        console.log(`scraped ${Object.keys(caseContents).length} cases with contents.`);
        writeJson("assets/data/case-contents.json", caseContents);
        console.log(`scraped ${Object.keys(caseSpecials).length} cases with specials.`);
        writeJson("assets/data/case-specials.json", caseSpecials);
    }

    private getSpecialsUrl(caseUrl: string, contents: string) {
        if (contents.includes("?Knives=1")) {
            return caseUrl + "?Knives=1";
        }
        if (contents.includes("?Gloves=1")) {
            return caseUrl + "?Gloves=1";
        }
        return undefined;
    }

    private getNames($: cheerio.CheerioAPI) {
        const items: string[] = [];
        $("h3").each((_, element) => {
            if (element.parent) {
                if ($(".price", element.parent).length > 0) {
                    items.push($(element).text().trim());
                }
            }
        });
        return items;
    }

    populate(baseItems: CS_Item[], generatedItems: CS_Item[]) {
        const lookup: Record<string, number> = {};
        for (const item of [...baseItems, ...generatedItems]) {
            if (["melee", "glove"].includes(item.type)) {
                // item.name (as in `specialsData`) => item.id
                lookup[item.base ? `${item.name} | ★ (Vanilla)` : item.name] = item.id;
            }
        }
        for (const [caseName, specials] of Object.entries(this.specialsData)) {
            this.specials[caseName] = specials.map((name) => {
                const id = lookup[name];
                if (!id) {
                    throw new Error(`item ${name} not found.`);
                }
                return id;
            });
        }
    }

    getSpecials(caseName: string) {
        const items = this.specials[caseName];
        if (!items) {
            console.log(`case ${caseName} does not have special items.`);
            return undefined;
        }
        return items;
    }
}

if (basename(process.argv[1]) === "case-scraper.ts") {
    new CasesScraper().run();
}
