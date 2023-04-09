/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { CS_Economy } from "./economy";
import { CS_TEAM_NONE } from "./teams";
const CAN_EQUIP = ["glove", "melee", "musickit", "weapon"];
const HAS_FLOAT = ["glove", "melee", "weapon"];
const HAS_NAMETAG = ["melee", "weapon"];
const HAS_SEED = ["glove", "melee"];
const HAS_STATTRAK = ["melee", "weapon"];
const HAS_STICKERS = ["weapon"];
export const nametagRE = /^[A-Za-z0-9|][A-Za-z0-9|\s]{0,19}$/;
class CS_Inventory {
    static locktime = 0;
    items = [];
    static setLocktime(seconds) {
        CS_Inventory.locktime = 1000 * seconds;
    }
    static isWithinLocktime(ms) {
        return ms !== undefined && Date.now() - ms < CS_Inventory.locktime;
    }
    constructor(items = []) {
        this.items = items;
    }
    get({ item, team }) {
        return this.items.find((equipped) => {
            const other = CS_Economy.getById(equipped.id);
            return (other.type === item.type &&
                other.model === item.model &&
                (equipped.team === team || item.teams === undefined));
        });
    }
    equip({ float, id, nametag, seed, stattrak, stickers, team }) {
        const item = CS_Economy.getById(id);
        if (item.teams === undefined) {
            team = CS_TEAM_NONE;
        }
        if (!CAN_EQUIP.includes(item.type)) {
            throw new Error("you cannot equip this item");
        }
        const equipped = this.get({ item, team });
        if (equipped !== undefined &&
            CS_Inventory.isWithinLocktime(equipped.locktime)) {
            if (!item.free && item.id !== equipped.id) {
                throw new Error("item is locked");
            }
            return new CS_Inventory(this.items.map((other) => other === equipped
                ? { ...other, unequipped: item.free ? true : undefined }
                : other));
        }
        const items = this.items.filter((other) => other !== equipped);
        if (item.free) {
            return new CS_Inventory(items);
        }
        if (float !== undefined) {
            if (!HAS_FLOAT.includes(item.type)) {
                throw new Error("invalid float");
            }
            if (float < 0.000001 || float > 0.999999) {
                throw new Error("invalid float");
            }
        }
        if (seed !== undefined) {
            if (!HAS_SEED.includes(item.type)) {
                throw new Error("invalid seed");
            }
            if (seed < 1 || seed > 1000) {
                throw new Error("invalid seed");
            }
        }
        if (stickers !== undefined) {
            if (!HAS_STICKERS.includes(item.type)) {
                throw new Error("invalid stickers");
            }
            if (stickers.length > 4) {
                throw new Error("invalid stickers");
            }
            for (const sticker of stickers) {
                if (CS_Economy.getById(sticker).type !== "sticker") {
                    throw new Error("invalid stickers");
                }
            }
        }
        if (nametag !== undefined) {
            if (!HAS_NAMETAG.includes(item.type)) {
                throw new Error("invalid nametag");
            }
            if (!nametagRE.test(nametag)) {
                throw new Error("invalid nametag");
            }
        }
        if (stattrak === true) {
            if (!HAS_STATTRAK.includes(item.type)) {
                throw new Error("invalid stattrak");
            }
        }
        return new CS_Inventory(items.concat({
            float,
            id: item.id,
            locktime: CS_Inventory.locktime > 0 ? Date.now() : undefined,
            nametag,
            seed,
            stattrak,
            stickers,
            team
        }));
    }
    safeEquip(item) {
        try {
            return this.equip(item);
        }
        catch {
            return this;
        }
    }
}
export { CS_Inventory };
