/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CS_validateUnlockedItem } from "./economy-case.js";
import { CS_Economy, CS_MAX_STATTRAK, CS_MAX_WEAR, CS_NAMETAG_TOOL_DEF, CS_STICKER_WEAR_FACTOR, CS_hasNametag, CS_hasStickers, CS_validateNametag, CS_validateSeed, CS_validateStatTrak, CS_validateStickers, CS_validateWear } from "./economy.js";
import { CS_TEAM_CT, CS_TEAM_T } from "./teams.js";
import { float } from "./util.js";
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
    addWithNametag(toolIndex, itemId, nametag) {
        if (nametag === "") {
            throw new Error("invalid nametag");
        }
        const toolItem = CS_Economy.getById(this.items[toolIndex].id);
        if (toolItem.type !== "tool" || toolItem.def !== CS_NAMETAG_TOOL_DEF) {
            throw new Error("tool must be name tag");
        }
        const targetItem = CS_Economy.getById(itemId);
        if (!CS_hasNametag(targetItem)) {
            throw new Error("item does not have nametag");
        }
        this.items.splice(toolIndex, 1);
        this.add({
            id: itemId,
            nametag
        });
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
        for (let other = 0; other < this.items.length; other++) {
            const current = this.items[other];
            if (index === other) {
                current.equipped = team === undefined ? true : undefined;
                current.equippedCT = team === CS_TEAM_CT ? true : current.equippedCT;
                current.equippedT = team === CS_TEAM_T ? true : current.equippedT;
            }
            else {
                const currentItem = CS_Economy.getById(current.id);
                if (currentItem.type === item.type && (item.type !== "weapon" || currentItem.model === item.model)) {
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
    unlockCase(unlockedItem, caseIndex, keyIndex) {
        if (!this.items[caseIndex] || (keyIndex !== undefined && !this.items[keyIndex])) {
            throw new Error("invalid inventory item(s)");
        }
        const caseItem = CS_Economy.getById(this.items[caseIndex].id);
        CS_validateUnlockedItem(caseItem, unlockedItem);
        const keyItem = keyIndex !== undefined ? CS_Economy.getById(this.items[keyIndex].id) : undefined;
        if (keyItem !== undefined && keyItem.type !== "key") {
            throw new Error("item is not a key");
        }
        if (caseItem.keys !== undefined && (keyItem === undefined || !caseItem.keys.includes(keyItem.id))) {
            throw new Error("case needs a valid key to be open");
        }
        if (caseItem.keys === undefined && keyItem !== undefined) {
            throw new Error("case does not need a key");
        }
        keyIndex = keyIndex !== undefined ? (keyIndex > caseIndex ? keyIndex - 1 : keyIndex) : undefined;
        this.items.splice(caseIndex, 1);
        if (keyIndex !== undefined) {
            this.items.splice(keyIndex, 1);
        }
        this.items.unshift({
            id: unlockedItem.id,
            ...unlockedItem.attributes
        });
        return this;
    }
    renameItem(toolIndex, targetIndex, nametag) {
        nametag = nametag === "" ? undefined : nametag;
        if (!this.items[toolIndex] || !this.items[targetIndex]) {
            throw new Error("invalid inventory item(s)");
        }
        const toolItem = CS_Economy.getById(this.items[toolIndex].id);
        if (toolItem.type !== "tool" || toolItem.def !== CS_NAMETAG_TOOL_DEF) {
            throw new Error("tool must be name tag");
        }
        const targetItem = CS_Economy.getById(this.items[targetIndex].id);
        if (!CS_hasNametag(targetItem)) {
            throw new Error("item does not have nametag");
        }
        if (nametag !== undefined) {
            CS_validateNametag(nametag);
        }
        this.items[targetIndex].nametag = nametag;
        this.items.splice(toolIndex, 1);
        return this;
    }
    applyItemSticker(itemIndex, stickerItemIndex, stickerIndex) {
        if (!this.items[itemIndex] || !this.items[stickerItemIndex]) {
            throw new Error("invalid inventory item(s)");
        }
        const inventoryItem = this.items[itemIndex];
        const item = CS_Economy.getById(inventoryItem.id);
        if (!CS_hasStickers(item)) {
            console.log(item);
            throw new Error("item does not have stickers");
        }
        const sticker = CS_Economy.getById(this.items[stickerItemIndex].id);
        if (sticker.type !== "sticker") {
            throw new Error("not applying a sticker");
        }
        const stickers = inventoryItem.stickers ?? [null, null, null, null];
        if (stickers[stickerIndex] !== null) {
            throw new Error("cant apply existing sticker");
        }
        stickers[stickerIndex] = sticker.id;
        inventoryItem.stickers = stickers;
        this.items.splice(stickerItemIndex, 1);
        return this;
    }
    scrapeItemSticker(itemIndex, stickerIndex) {
        const inventoryItem = this.items[itemIndex];
        if (!inventoryItem || !inventoryItem.stickers) {
            throw new Error("invalid inventory item");
        }
        const { stickers } = inventoryItem;
        if (typeof stickers[stickerIndex] !== "number") {
            throw new Error("invalid sticker index");
        }
        const stickersWear = inventoryItem.stickerswear ?? [null, null, null, null];
        const stickerWear = stickersWear[stickerIndex] || 0;
        const nextWear = float(stickerWear + CS_STICKER_WEAR_FACTOR);
        if (nextWear > CS_MAX_WEAR) {
            stickers[stickerIndex] = null;
            stickersWear[stickerIndex] = null;
            inventoryItem.stickers = stickers.filter((id) => id !== null).length > 0 ? stickers : undefined;
            inventoryItem.stickerswear =
                stickersWear.filter((wear) => wear !== null).length > 0 ? stickersWear : undefined;
            return this;
        }
        stickersWear[stickerIndex] = nextWear;
        inventoryItem.stickerswear = stickersWear;
        return this;
    }
    incrementItemStatTrak(itemIndex) {
        const inventoryItem = this.items[itemIndex];
        if (!inventoryItem || inventoryItem.stattrak === undefined) {
            throw new Error("invalid inventory item");
        }
        if (inventoryItem.stattrak < CS_MAX_STATTRAK) {
            inventoryItem.stattrak++;
        }
        return this;
    }
    get(index) {
        return this.items[index];
    }
    getAll() {
        return this.items;
    }
    remove(index) {
        if (!this.items[index]) {
            return this;
        }
        this.items.splice(index, 1);
        return this;
    }
    removeAll() {
        while (this.items[0]) {
            this.items.splice(0, 1);
        }
    }
    size() {
        return this.items.length;
    }
}
