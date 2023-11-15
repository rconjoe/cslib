/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CS_Economy, CS_validateWear, CS_validateNametag, CS_validateSeed, CS_validateStatTrak, CS_validateStickers } from "./economy.js";
import { CS_TEAM_CT, CS_TEAM_T } from "./teams.js";
export const CS_INVENTORY_EQUIPPABLE_ITEMS = ["weapon", "glove", "melee", "musickit", "agent", "patch", "pin"];
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
    add(item) {
        if (this.full()) {
            return this;
        }
        const csItem = CS_Economy.getById(item.id);
        if (item.wear !== undefined) {
            CS_validateWear(item.wear, csItem);
        }
        if (item.seed !== undefined) {
            CS_validateSeed(item.seed, csItem);
        }
        if (item.stickers !== undefined) {
            CS_validateStickers(csItem, item.stickers, item.stickerswear);
        }
        if (item.nametag !== undefined) {
            CS_validateNametag(item.nametag, csItem);
        }
        if (item.stattrak !== undefined) {
            CS_validateStatTrak(item.stattrak, csItem);
        }
        return new CS_Inventory([
            {
                ...item,
                equipped: undefined,
                equippedCT: undefined,
                equippedT: undefined
            },
            ...this.items
        ], this.limit);
    }
    safeAdd(item) {
        try {
            return this.add(item);
        }
        catch {
            return this;
        }
    }
    remove(at) {
        if (!this.items[at]) {
            return this;
        }
        return new CS_Inventory(this.items.filter((_, index) => {
            return at !== index;
        }), this.limit);
    }
    equip(at, csTeam) {
        const item = this.items[at];
        if (!item) {
            return this;
        }
        if (item.equipped) {
            return this;
        }
        if (csTeam === CS_TEAM_CT && item.equippedCT) {
            return this;
        }
        if (csTeam === CS_TEAM_T && item.equippedT) {
            return this;
        }
        const csItem = CS_Economy.getById(item.id);
        if (!CS_INVENTORY_EQUIPPABLE_ITEMS.includes(csItem.type)) {
            return this;
        }
        if (csTeam === undefined && csItem.teams !== undefined) {
            return this;
        }
        if (csTeam !== undefined && !csItem.teams?.includes(csTeam)) {
            return this;
        }
        return new CS_Inventory(this.items.map((current, index) => {
            if (index === at) {
                return {
                    ...current,
                    equipped: csTeam === undefined ? true : undefined,
                    equippedCT: csTeam === CS_TEAM_CT ? true : current.equippedCT,
                    equippedT: csTeam === CS_TEAM_T ? true : current.equippedT
                };
            }
            const currentCsItem = CS_Economy.getById(current.id);
            if (currentCsItem.type === csItem.type &&
                (csItem.type !== "weapon" || currentCsItem.model === csItem.model)) {
                return {
                    ...current,
                    equipped: csTeam === undefined ? undefined : current.equipped,
                    equippedCT: csTeam === CS_TEAM_CT ? undefined : current.equippedCT,
                    equippedT: csTeam === CS_TEAM_T ? undefined : current.equippedT
                };
            }
            return current;
        }), this.limit);
    }
    unequip(at, csTeam) {
        if (!this.items[at]) {
            return this;
        }
        return new CS_Inventory(this.items.map((item, index) => {
            if (at === index) {
                return {
                    ...item,
                    equipped: csTeam === undefined ? undefined : item.equipped,
                    equippedCT: csTeam === CS_TEAM_CT ? undefined : item.equippedCT,
                    equippedT: csTeam === CS_TEAM_T ? undefined : item.equippedT
                };
            }
            return item;
        }), this.limit);
    }
    getItems() {
        return this.items;
    }
}
export class CS_MutableInventory {
    items;
    limit;
    constructor(items = [], limit = 256) {
        this.items = items;
        this.limit = limit;
    }
    full() {
        return this.items.length === this.limit;
    }
    add(item) {
        if (this.full()) {
            return false;
        }
        const csItem = CS_Economy.getById(item.id);
        if (item.wear !== undefined) {
            CS_validateWear(item.wear, csItem);
        }
        if (item.seed !== undefined) {
            CS_validateSeed(item.seed, csItem);
        }
        if (item.stickers !== undefined) {
            CS_validateStickers(csItem, item.stickers, item.stickerswear);
        }
        if (item.nametag !== undefined) {
            CS_validateNametag(item.nametag, csItem);
        }
        if (item.stattrak !== undefined) {
            CS_validateStatTrak(item.stattrak, csItem);
        }
        this.items.unshift({
            ...item,
            equipped: undefined,
            equippedCT: undefined,
            equippedT: undefined
        });
        return true;
    }
    safeAdd(item) {
        try {
            return this.add(item);
        }
        catch {
            return false;
        }
    }
    remove(at) {
        if (!this.items[at]) {
            return false;
        }
        this.items.splice(at, 1);
        return true;
    }
    equip(at, csTeam) {
        const item = this.items[at];
        if (!item) {
            return false;
        }
        if (item.equipped) {
            return false;
        }
        if (csTeam === CS_TEAM_CT && item.equippedCT) {
            return false;
        }
        if (csTeam === CS_TEAM_T && item.equippedT) {
            return false;
        }
        const csItem = CS_Economy.getById(item.id);
        if (!CS_INVENTORY_EQUIPPABLE_ITEMS.includes(csItem.type)) {
            return false;
        }
        if (csTeam === undefined && csItem.teams !== undefined) {
            return false;
        }
        if (csTeam !== undefined && !csItem.teams?.includes(csTeam)) {
            return false;
        }
        for (const [index, current] of this.items.entries()) {
            if (index === at) {
                current.equipped = csTeam === undefined ? true : undefined;
                current.equippedCT = csTeam === CS_TEAM_CT ? true : current.equippedCT;
                current.equippedT = csTeam === CS_TEAM_T ? true : current.equippedT;
            }
            const currentCsItem = CS_Economy.getById(current.id);
            if (currentCsItem.type === csItem.type &&
                (csItem.type !== "weapon" || currentCsItem.model === csItem.model)) {
                current.equipped = csTeam === undefined ? undefined : current.equipped;
                current.equippedCT = csTeam === CS_TEAM_CT ? undefined : current.equippedCT;
                current.equippedT = csTeam === CS_TEAM_T ? undefined : current.equippedT;
            }
        }
        return true;
    }
    unequip(at, csTeam) {
        if (!this.items[at]) {
            return false;
        }
        const item = this.items[at];
        item.equipped = csTeam === undefined ? undefined : item.equipped;
        item.equippedCT = csTeam === CS_TEAM_CT ? undefined : item.equippedCT;
        item.equippedT = csTeam === CS_TEAM_T ? undefined : item.equippedT;
        return true;
    }
    getItems() {
        return this.items;
    }
}
