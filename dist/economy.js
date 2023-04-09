/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { compare } from "./util";
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
