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
    static setItems(items) {
        CS_Economy.items = items;
        CS_Economy.itemsMap.clear();
        items.forEach((item) => CS_Economy.itemsMap.set(item.id, item));
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
}
export { CS_Economy };
