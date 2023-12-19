/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { compare, safe } from "./util.js";
export const CS_MIN_STATTRAK = 0;
export const CS_MAX_STATTRAK = 999999;
export const CS_WEAR_FACTOR = 0.000001;
export const CS_MIN_WEAR = 0;
export const CS_MAX_WEAR = 1;
export const CS_DEFAULT_MIN_WEAR = 0.06;
export const CS_DEFAULT_MAX_WEAR = 0.8;
export const CS_MIN_FACTORY_NEW_WEAR = CS_MIN_WEAR;
export const CS_MAX_FACTORY_NEW_WEAR = 0.07;
export const CS_MIN_MINIMAL_WEAR_WEAR = 0.070001;
export const CS_MAX_MINIMAL_WEAR_WEAR = 0.15;
export const CS_MIN_FIELD_TESTED_WEAR = 0.150001;
export const CS_MAX_FIELD_TESTED_WEAR = 0.37;
export const CS_MIN_WELL_WORN_WEAR = 0.370001;
export const CS_MAX_WELL_WORN_WEAR = 0.44;
export const CS_MIN_BATTLE_SCARRED_WEAR = 0.440001;
export const CS_MAX_BATTLE_SCARRED_WEAR = CS_MAX_WEAR;
export const CS_MIN_SEED = 1;
export const CS_MAX_SEED = 1000;
export const CS_WEARABLE_ITEMS = ["glove", "melee", "weapon"];
export const CS_NAMETAGGABLE_ITEMS = ["melee", "weapon"];
export const CS_SEEDABLE_ITEMS = ["weapon", "melee"];
export const CS_STATTRAKABLE_ITEMS = ["melee", "weapon", "musickit"];
export const CS_STICKERABLE_ITEMS = ["weapon"];
export const CS_NAMETAG_RE = /^[A-Za-z0-9`!@#$%^&*-+=(){}\[\]\/\|\\,.?:;'_\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\s]{0,20}$/u;
export const CS_MIN_STICKER_WEAR = 0;
export const CS_MAX_STICKER_WEAR = 0.9;
export const CS_SPECIAL_ITEM_IMAGE_DEFAULT = 1;
export const CS_SPECIAL_ITEM_IMAGE_CUSTOM = 2;
export const CS_NAMETAG_TOOL_DEF = 1200;
function filterItems(predicate) {
    return function filter(item) {
        return (compare(predicate.type, item.type) &&
            compare(predicate.free, item.free) &&
            compare(predicate.model, item.model) &&
            compare(predicate.base, item.base) &&
            compare(predicate.category, item.category) &&
            (predicate.team === undefined || item.teams === undefined || item.teams.includes(predicate.team)));
    };
}
export class CS_Economy {
    static items = [];
    static itemMap = new Map();
    static categories = new Set();
    static stickers = [];
    static initialize(items) {
        CS_Economy.categories.clear();
        CS_Economy.items = items;
        CS_Economy.itemMap.clear();
        CS_Economy.stickers = [];
        items.forEach((item) => {
            CS_Economy.itemMap.set(item.id, item);
            if (item.type === "sticker" && item.category !== undefined) {
                CS_Economy.stickers.push(item);
                CS_Economy.categories.add(item.category);
            }
        });
    }
    static getById(id) {
        const item = CS_Economy.itemMap.get(id);
        if (item === undefined) {
            throw new Error("item not found");
        }
        return item;
    }
}
export function CS_findItem(predicate) {
    const item = CS_Economy.items.find(filterItems(predicate));
    if (item === undefined) {
        throw new Error("item not found");
    }
    return item;
}
export function CS_filterItems(predicate) {
    const items = CS_Economy.items.filter(filterItems(predicate));
    if (items.length === 0) {
        throw new Error("items not found");
    }
    return items;
}
export function CS_hasWear(item) {
    return CS_WEARABLE_ITEMS.includes(item.type);
}
export function CS_validateWear(wear, forItem) {
    if (Number.isNaN(wear)) {
        throw new Error("invalid wear.");
    }
    if (forItem !== undefined && !CS_hasWear(forItem)) {
        throw new Error("item does not have wear");
    }
    if (String(wear).length > String(CS_WEAR_FACTOR).length) {
        throw new Error("invalid wear length");
    }
    if (wear < CS_MIN_WEAR || wear > CS_MAX_WEAR) {
        throw new Error("invalid wear");
    }
    if (forItem !== undefined) {
        if (forItem.wearmin !== undefined && wear < forItem.wearmin) {
            throw new Error("invalid wear");
        }
        if (forItem.wearmax !== undefined && wear > forItem.wearmax) {
            throw new Error("invalid wear");
        }
    }
    return true;
}
export const CS_safeValidateWear = safe(CS_validateWear);
export function CS_hasSeed(item) {
    return CS_SEEDABLE_ITEMS.includes(item.type);
}
export function CS_validateSeed(seed, forItem) {
    if (Number.isNaN(seed)) {
        throw new Error("invalid seed.");
    }
    if (forItem !== undefined && !CS_hasSeed(forItem)) {
        throw new Error("item does not have seed");
    }
    if (String(seed).includes(".")) {
        throw new Error("seed is an integer");
    }
    if (seed < CS_MIN_SEED || seed > CS_MAX_SEED) {
        throw new Error("invalid seed");
    }
    return true;
}
export const CS_safeValidateSeed = safe(CS_validateSeed);
export function CS_hasStickers(item) {
    return CS_STICKERABLE_ITEMS.includes(item.type);
}
export function CS_validateStickers(item, stickers, stickerswear = []) {
    if (!CS_hasStickers(item)) {
        throw new Error("item does not have seed");
    }
    if (stickers.length > 4) {
        throw new Error("invalid stickers");
    }
    for (const [index, sticker] of stickers.entries()) {
        if (sticker === null) {
            if (stickerswear[index] !== undefined) {
                throw new Error("invalid wear");
            }
            continue;
        }
        if (Number.isNaN(sticker)) {
            throw new Error("invalid sticker");
        }
        if (CS_Economy.getById(sticker).type !== "sticker") {
            throw new Error("invalid sticker");
        }
        const wear = stickerswear[index];
        if (typeof wear === "number") {
            if (Number.isNaN(wear)) {
                throw new Error("invalid sticker wear");
            }
            if (String(wear).length > 5) {
                throw new Error("invalid sticker wear length");
            }
            if (wear < CS_MIN_STICKER_WEAR && wear > CS_MAX_STICKER_WEAR) {
                throw new Error("invalid sticker wear wear");
            }
        }
    }
    return true;
}
export function CS_hasNametag(item) {
    return CS_NAMETAGGABLE_ITEMS.includes(item.type);
}
export function CS_validateNametag(nametag, forItem) {
    if (forItem !== undefined && !CS_hasNametag(forItem)) {
        throw new Error("invalid nametag");
    }
    if (nametag[0] === " " || !CS_NAMETAG_RE.test(nametag)) {
        throw new Error("invalid nametag");
    }
    return true;
}
export const CS_safeValidateNametag = safe(CS_validateNametag);
export function CS_hasStatTrak(item) {
    return CS_STATTRAKABLE_ITEMS.includes(item.type);
}
export function CS_validateStatTrak(stattrak, forItem) {
    if (Number.isNaN(stattrak)) {
        throw new Error("invalid stattrak");
    }
    if (forItem !== undefined && !CS_hasStatTrak(forItem)) {
        throw new Error("invalid stattrak");
    }
    if (stattrak < CS_MIN_STATTRAK || stattrak > CS_MAX_STATTRAK) {
        throw new Error("invalid stattrak");
    }
    return true;
}
export const CS_safeValidateStatTrak = safe(CS_validateStatTrak);
export function CS_getWearLabel(wear) {
    if (wear <= CS_MAX_FACTORY_NEW_WEAR) {
        return "FN";
    }
    if (wear <= CS_MAX_MINIMAL_WEAR_WEAR) {
        return "MW";
    }
    if (wear <= CS_MAX_FIELD_TESTED_WEAR) {
        return "FT";
    }
    if (wear <= CS_MAX_WELL_WORN_WEAR) {
        return "WW";
    }
    return "BS";
}
export function CS_getStickerCategories() {
    return Array.from(CS_Economy.categories).sort();
}
export function CS_getStickers() {
    return CS_Economy.stickers;
}
export function CS_resolveItemImage(baseUrl, item, wear) {
    const { base, id, image, localimage } = typeof item === "number" ? CS_Economy.getById(item) : item;
    const url = `${baseUrl}/${id}`;
    switch (true) {
        case !localimage && image.charAt(0) === "/":
            return `${baseUrl}${image}`;
        case !localimage:
            return image;
        case base:
            return `${baseUrl}/${id}.png`;
        case wear === undefined:
            return `${url}_light.png`;
        // In the future we need to be more precise on this, I don't think it's
        // correct. Please let me know if you know which wear each image
        // matches.
        case wear !== undefined && wear < 1 / 3:
            return `${url}_light.png`;
        case wear !== undefined && wear < 2 / 3:
            return `${url}_medium.png`;
        default:
            return `${url}_heavy.png`;
    }
}
export function CS_resolveCaseSpecialItemImage(baseUrl, item) {
    item = typeof item === "number" ? CS_Economy.getById(item) : item;
    const { id, type, specialimage } = item;
    if (type !== "case") {
        throw new Error("item is not a case");
    }
    if (specialimage === undefined) {
        throw new Error("case does not have special items");
    }
    if (specialimage === CS_SPECIAL_ITEM_IMAGE_CUSTOM) {
        return `${baseUrl}/${id}_rare.png`;
    }
    return `${baseUrl}/default_rare_item.png`;
}
