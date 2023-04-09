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
            (predicate.team === undefined ||
                predicate.teams === undefined ||
                predicate.teams.includes(predicate.team)));
    };
}
export var CS_Economy = /** @class */ (function () {
    function CS_Economy() {
    }
    CS_Economy.setItems = function (items) {
        CS_Economy.items = items;
        CS_Economy.itemsMap.clear();
        items.forEach(function (item) { return CS_Economy.itemsMap.set(item.id, item); });
    };
    CS_Economy.setItemsDef = function (itemDefs) {
        CS_Economy.itemsDef = itemDefs;
        CS_Economy.itemsDefMap.clear();
        itemDefs.forEach(function (item) { return CS_Economy.itemsDefMap.set(item.id, item); });
    };
    CS_Economy.getById = function (id) {
        var item = CS_Economy.itemsMap.get(id);
        if (item === undefined) {
            throw new Error("item not found");
        }
        return item;
    };
    CS_Economy.find = function (predicate) {
        var item = CS_Economy.items.find(filterItems(predicate));
        if (item === undefined) {
            throw new Error("item not found");
        }
        return item;
    };
    CS_Economy.filter = function (predicate) {
        var items = CS_Economy.items.filter(filterItems(predicate));
        if (items.length === 0) {
            throw new Error("items not found");
        }
        return items;
    };
    CS_Economy.items = [];
    CS_Economy.itemsDef = [];
    CS_Economy.itemsMap = new Map();
    CS_Economy.itemsDefMap = new Map();
    return CS_Economy;
}());
