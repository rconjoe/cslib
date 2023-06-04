/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { compare } from "./util.js";
export const CS_MIN_FLOAT = 0.000001;
export const CS_MAX_FLOAT = 0.999999;
export const CS_MIN_FACTORY_NEW_FLOAT = CS_MIN_FLOAT;
export const CS_MAX_FACTORY_NEW_FLOAT = 0.07;
export const CS_MIN_MINIMAL_WEAR_FLOAT = 0.070001;
export const CS_MAX_MINIMAL_WEAR_FLOAT = 0.15;
export const CS_MIN_FIELD_TESTED_FLOAT = 0.150001;
export const CS_MAX_FIELD_TESTED_FLOAT = 0.37;
export const CS_MIN_WELL_WORN_FLOAT = 0.370001;
export const CS_MAX_WELL_WORN_FLOAT = 0.44;
export const CS_MIN_BATTLE_SCARRED_FLOAT = 0.440001;
export const CS_MAX_BATTLE_SCARRED_FLOAT = CS_MAX_FLOAT;
export const CS_MIN_SEED = 1;
export const CS_MAX_SEED = 1000;
export const CS_FLOATABLE_ITEMS = ["glove", "melee", "weapon"];
export const CS_NAMETAGGABLE_ITEMS = ["melee", "weapon"];
export const CS_SEEDABLE_ITEMS = ["weapon", "melee"];
export const CS_STATTRAKABLE_ITEMS = ["melee", "weapon"];
export const CS_STICKERABLE_ITEMS = ["weapon"];
export const CS_nametagRE = /^[A-Za-z0-9|][A-Za-z0-9|\s]{0,19}$/;
export const CS_MIN_STICKER_FLOAT = 0;
export const CS_MAX_STICKER_FLOAT = 0.9;
function filterItems(predicate) {
    return function filter(item) {
        return (compare(predicate.type, item.type) &&
            compare(predicate.free, item.free) &&
            compare(predicate.model, item.model) &&
            compare(predicate.base, item.base) &&
            compare(predicate.category, item.category) &&
            (predicate.team === undefined ||
                item.teams === undefined ||
                item.teams.includes(predicate.team)));
    };
}
export const CS_CATEGORY_MENU = [
    {
        label: "Pistol",
        category: "secondary",
        unique: false
    },
    {
        label: "SMG",
        category: "smg",
        unique: false
    },
    {
        label: "Heavy",
        category: "heavy",
        unique: false
    },
    {
        label: "Rifle",
        category: "rifle",
        unique: false
    },
    {
        label: "Knife",
        category: "melee",
        unique: true
    },
    {
        label: "Glove",
        category: "glove",
        unique: true
    },
    {
        label: "Music Kit",
        category: "musickit",
        unique: true
    }
];
class CS_Economy {
    static items = [];
    static itemsDef = [];
    static itemsMap = new Map();
    static itemsDefMap = new Map();
    static stickerCategories = [];
    static stickers;
    static setItems(items) {
        CS_Economy.stickers = [];
        CS_Economy.stickerCategories = [];
        CS_Economy.items = items;
        CS_Economy.itemsMap.clear();
        items.forEach((item) => {
            CS_Economy.itemsMap.set(item.id, item);
            if (item.type === "sticker") {
                CS_Economy.stickers.push(item);
                if (CS_Economy.stickerCategories.indexOf(item.category) === -1) {
                    CS_Economy.stickerCategories.push(item.category);
                }
            }
        });
        CS_Economy.stickerCategories.sort();
    }
    static setItemsDef(itemDefs) {
        CS_Economy.itemsDef = itemDefs;
        CS_Economy.itemsDefMap.clear();
        itemDefs.forEach((item) => CS_Economy.itemsDefMap.set(item.id, item));
    }
    static getById(id) {
        const item = CS_Economy.itemsMap.get(id);
        if (item === undefined) {
            throw new Error("item not found");
        }
        return item;
    }
    static getDefById(id) {
        const item = CS_Economy.itemsDefMap.get(id);
        if (item === undefined) {
            throw new Error("item not found");
        }
        return item;
    }
    static find(predicate) {
        const item = CS_Economy.items.find(filterItems(predicate));
        if (item === undefined) {
            throw new Error("item not found");
        }
        return item;
    }
    static filter(predicate) {
        const items = CS_Economy.items.filter(filterItems(predicate));
        if (items.length === 0) {
            throw new Error("items not found");
        }
        return items;
    }
    static hasFloat(item) {
        return CS_FLOATABLE_ITEMS.includes(item.type);
    }
    static validateFloat(item, float) {
        if (!CS_Economy.hasFloat(item)) {
            throw new Error("invalid float");
        }
        if (float < CS_MIN_FLOAT || float > CS_MAX_FLOAT) {
            throw new Error("invalid float");
        }
    }
    static hasSeed(item) {
        return CS_SEEDABLE_ITEMS.includes(item.type);
    }
    static validateSeed(item, seed) {
        if (!CS_Economy.hasSeed(item)) {
            throw new Error("invalid seed");
        }
        if (seed < CS_MIN_SEED || seed > CS_MAX_SEED) {
            throw new Error("invalid seed");
        }
    }
    static hasStickers(item) {
        return CS_STICKERABLE_ITEMS.includes(item.type);
    }
    static validateStickers(item, stickers) {
        if (!CS_Economy.hasStickers(item)) {
            throw new Error("invalid stickers");
        }
        if (stickers.length > 4) {
            throw new Error("invalid stickers");
        }
        for (const sticker of stickers) {
            if (sticker === null) {
                continue;
            }
            if (CS_Economy.getById(sticker).type !== "sticker") {
                throw new Error("invalid stickers");
            }
        }
    }
    static hasNametag(item) {
        return CS_NAMETAGGABLE_ITEMS.includes(item.type);
    }
    static validateNametag(item, nametag) {
        if (!CS_Economy.hasNametag(item)) {
            throw new Error("invalid nametag");
        }
        if (!CS_nametagRE.test(nametag)) {
            throw new Error("invalid nametag");
        }
    }
    static hasStattrak(item) {
        return CS_STATTRAKABLE_ITEMS.includes(item.type);
    }
    static validateStattrak(item, stattrak) {
        if (stattrak === true && !CS_Economy.hasStattrak(item)) {
            throw new Error("invalid stattrak");
        }
    }
    static getFloatLabel(float) {
        if (float <= CS_MAX_FACTORY_NEW_FLOAT) {
            return "FN";
        }
        if (float <= CS_MAX_MINIMAL_WEAR_FLOAT) {
            return "MW";
        }
        if (float <= CS_MAX_FIELD_TESTED_FLOAT) {
            return "FT";
        }
        if (float <= CS_MAX_WELL_WORN_FLOAT) {
            return "WW";
        }
        return "BS";
    }
    static getStickerCategories() {
        return CS_Economy.stickerCategories;
    }
    static getStickers() {
        return CS_Economy.stickers;
    }
}
export { CS_Economy };
