/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CS_unlockCase } from "./economy-case.js";
import { CS_Economy, CS_validateWear, CS_validateNametag, CS_validateSeed, CS_validateStatTrak, CS_validateStickers, CS_NAMETAG_TOOL_DEF, CS_hasNametag } from "./economy.js";
import { CS_TEAM_CT, CS_TEAM_T } from "./teams.js";
export const CS_INVENTORY_EQUIPPABLE_ITEMS = [
    "agent",
    "glove",
    "graffiti",
    "melee",
    "musickit",
    "patch",
    "pin",
    "weapon"
];
export class CS_Inventory {
    items;
    limit;
    constructor(items = [], limit = 256) {
        this.items = items;
        this.limit = limit;
    }
    full() {
        return this.items.length === this.limit;
    }
    add(inventoryItem) {
        if (this.full()) {
            return this;
        }
        const item = CS_Economy.getById(inventoryItem.id);
        if (inventoryItem.wear !== undefined) {
            CS_validateWear(inventoryItem.wear, item);
        }
        if (inventoryItem.seed !== undefined) {
            CS_validateSeed(inventoryItem.seed, item);
        }
        if (inventoryItem.stickers !== undefined) {
            CS_validateStickers(item, inventoryItem.stickers, inventoryItem.stickerswear);
        }
        if (inventoryItem.nametag !== undefined) {
            CS_validateNametag(inventoryItem.nametag, item);
        }
        if (inventoryItem.stattrak !== undefined) {
            CS_validateStatTrak(inventoryItem.stattrak, item);
        }
        this.items.unshift({
            ...inventoryItem,
            equipped: undefined,
            equippedCT: undefined,
            equippedT: undefined
        });
        return this;
    }
    safeAdd(inventoryItem) {
        try {
            return this.add(inventoryItem);
        }
        catch {
            return this;
        }
    }
    remove(index) {
        if (!this.items[index]) {
            return this;
        }
        this.items.splice(index, 1);
        return this;
    }
    equip(index, team) {
        const inventoryItem = this.items[index];
        if (!inventoryItem) {
            return this;
        }
        if (inventoryItem.equipped) {
            return this;
        }
        if (team === CS_TEAM_CT && inventoryItem.equippedCT) {
            return this;
        }
        if (team === CS_TEAM_T && inventoryItem.equippedT) {
            return this;
        }
        const item = CS_Economy.getById(inventoryItem.id);
        if (!CS_INVENTORY_EQUIPPABLE_ITEMS.includes(item.type)) {
            return this;
        }
        if (team === undefined && item.teams !== undefined) {
            return this;
        }
        if (team !== undefined && !item.teams?.includes(team)) {
            return this;
        }
        for (let index = 0; index < this.items.length; index++) {
            const current = this.items[index];
            if (index === index) {
                current.equipped = team === undefined ? true : undefined;
                current.equippedCT = team === CS_TEAM_CT ? true : current.equippedCT;
                current.equippedT = team === CS_TEAM_T ? true : current.equippedT;
            }
            else {
                const currentitem = CS_Economy.getById(current.id);
                if (currentitem.type === item.type && (item.type !== "weapon" || currentitem.model === item.model)) {
                    current.equipped = team === undefined ? undefined : current.equipped;
                    current.equippedCT = team === CS_TEAM_CT ? undefined : current.equippedCT;
                    current.equippedT = team === CS_TEAM_T ? undefined : current.equippedT;
                }
            }
        }
        return this;
    }
    unequip(index, team) {
        if (!this.items[index]) {
            return this;
        }
        const item = this.items[index];
        item.equipped = team === undefined ? undefined : item.equipped;
        item.equippedCT = team === CS_TEAM_CT ? undefined : item.equippedCT;
        item.equippedT = team === CS_TEAM_T ? undefined : item.equippedT;
        return this;
    }
    unlockCase(caseIndex, keyIndex, unlockedItem) {
        if (!this.items[caseIndex] || (keyIndex !== undefined && !this.items[keyIndex])) {
            throw new Error("invalid inventory item(s).");
        }
        const caseItem = CS_Economy.getById(this.items[caseIndex].id);
        if (caseItem.type !== "case") {
            throw new Error("item is not a case.");
        }
        const keyItem = keyIndex !== undefined ? CS_Economy.getById(this.items[keyIndex].id) : undefined;
        if (keyItem !== undefined && keyItem.type !== "key") {
            throw new Error("item is not a key.");
        }
        if (caseItem.keys !== undefined && (keyItem === undefined || !caseItem.keys.includes(keyItem.id))) {
            throw new Error("case needs a valid key to be open.");
        }
        if (caseItem.keys === undefined && keyItem !== undefined) {
            throw new Error("case does not need a key.");
        }
        unlockedItem = unlockedItem !== undefined ? unlockedItem : CS_unlockCase(caseItem);
        keyIndex = keyIndex !== undefined ? (keyIndex > caseIndex ? keyIndex - 1 : keyIndex) : undefined;
        this.items.splice(caseIndex, 1);
        if (keyIndex !== undefined) {
            this.items.splice(keyIndex, 1);
        }
        this.items.unshift({
            id: unlockedItem.item.id,
            ...unlockedItem.attributes
        });
        return unlockedItem;
    }
    renameItem(toolIndex, targetIndex, nametag) {
        nametag = nametag === "" ? undefined : nametag;
        if (!this.items[toolIndex] || !this.items[targetIndex]) {
            throw new Error("invalid inventory item(s).");
        }
        const toolItem = CS_Economy.getById(this.items[toolIndex].id);
        if (toolItem.type !== "tool" || toolItem.def !== CS_NAMETAG_TOOL_DEF) {
            throw new Error("tool must be name tag.");
        }
        const targetItem = CS_Economy.getById(this.items[targetIndex].id);
        if (!CS_hasNametag(targetItem)) {
            throw new Error("item does not have nametag.");
        }
        if (nametag !== undefined) {
            CS_validateNametag(nametag);
        }
        this.items[targetIndex].nametag = nametag;
        this.items.splice(toolIndex, 1);
        return this;
    }
    get(index) {
        return this.items[index];
    }
    getAll() {
        return this.items;
    }
    size() {
        return this.items.length;
    }
}
