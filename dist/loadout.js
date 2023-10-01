/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { CS_DEFAULT_GENERATED_HEAVY, CS_DEFAULT_GENERATED_LIGHT, CS_DEFAULT_GENERATED_MEDIUM, CS_Economy, CS_MIN_FIELD_TESTED_FLOAT, CS_MIN_FLOAT, CS_MIN_MINIMAL_WEAR_FLOAT } from "./economy.js";
import { CS_TEAM_NONE } from "./teams.js";
export const CS_EQUIPABLE_ITEMS = ["glove", "melee", "musickit", "weapon"];
class CS_Loadout {
    static locktime = 0;
    items = [];
    static setLockTime(seconds) {
        CS_Loadout.locktime = 1000 * seconds;
    }
    static isWithinLockTime(ms) {
        return ms !== undefined && Date.now() - ms < CS_Loadout.locktime;
    }
    static resolveImage(csItem, loadoutItem, baseUrl) {
        if (csItem.localimage === undefined) {
            return csItem.image;
        }
        if (loadoutItem.float === undefined) {
            return csItem.image;
        }
        const hasLight = csItem.localimage & CS_DEFAULT_GENERATED_LIGHT;
        const hasMedium = csItem.localimage & CS_DEFAULT_GENERATED_MEDIUM;
        const hasHeavy = csItem.localimage & CS_DEFAULT_GENERATED_HEAVY;
        if (loadoutItem.float >= CS_MIN_MINIMAL_WEAR_FLOAT && hasLight) {
            return `${baseUrl}/${csItem.id}_light.png`;
        }
        if (loadoutItem.float >= CS_MIN_FIELD_TESTED_FLOAT && hasMedium) {
            return `${baseUrl}/${csItem.id}_medium.png`;
        }
        if (loadoutItem.float >= CS_MIN_FLOAT && hasHeavy) {
            return `${baseUrl}/${csItem.id}_heavy.png`;
        }
        // If don't have the proper float to display, we are going to the get
        // the highest quality we have or fall back to legacy image (from CSGO).
        if (hasLight) {
            return `${baseUrl}/${csItem.id}_light.png`;
        }
        return csItem.image;
    }
    constructor(items = []) {
        this.items = items;
    }
    getTypeFromCategory(category) {
        const type = CS_Economy.items.find((item) => item.category === category)?.type;
        if (type === undefined) {
            throw new Error("type not found");
        }
        return type;
    }
    get({ item, team }) {
        return this.items.find((equipped) => {
            const other = CS_Economy.getById(equipped.id);
            return (other.type === item.type &&
                (item.type !== "weapon" || other.model === item.model) &&
                (equipped.team === team || other.teams === undefined));
        });
    }
    getAll(team) {
        const items = this.items.map((loadoutItem) => {
            const csItem = CS_Economy.getById(loadoutItem.id);
            if (team !== undefined &&
                csItem.teams !== undefined &&
                loadoutItem.team !== team) {
                return undefined;
            }
            return {
                csItem,
                loadoutItem
            };
        });
        return items.filter(Boolean);
    }
    equip({ float, id, nametag, seed, stattrak, stickers, team }) {
        const item = CS_Economy.getById(id);
        if (item.teams === undefined) {
            team = CS_TEAM_NONE;
        }
        if (!CS_EQUIPABLE_ITEMS.includes(item.type)) {
            throw new Error("you cannot equip this item");
        }
        const equipped = this.get({ item, team });
        if (equipped !== undefined &&
            CS_Loadout.isWithinLockTime(equipped.locktime)) {
            if (!item.free && item.id !== equipped.id) {
                throw new Error("item is locked");
            }
            return new CS_Loadout(this.items.map((other) => other === equipped
                ? { ...other, unequipped: item.free ? true : undefined }
                : other));
        }
        const items = this.items.filter((other) => other !== equipped &&
            (CS_Loadout.isWithinLockTime(other.locktime) ||
                !other.unequipped));
        if (item.free) {
            return new CS_Loadout(items);
        }
        if (float !== undefined) {
            CS_Economy.validateFloat(item, float);
        }
        if (seed !== undefined) {
            CS_Economy.validateSeed(item, seed);
        }
        if (stickers !== undefined) {
            CS_Economy.validateStickers(item, stickers);
        }
        if (nametag !== undefined) {
            CS_Economy.validateNametag(item, nametag);
        }
        if (stattrak !== undefined) {
            CS_Economy.validateStattrak(item, stattrak);
        }
        return new CS_Loadout(items.concat({
            float,
            id: item.id,
            locktime: CS_Loadout.locktime > 0 ? Date.now() : undefined,
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
    getEquipped({ category, team }) {
        const type = this.getTypeFromCategory(category);
        if (type !== "weapon") {
            const item = this.get({
                item: { type },
                team
            });
            if (item !== undefined && !item.unequipped) {
                return {
                    equippable: false,
                    items: [
                        {
                            csItem: CS_Economy.getById(item.id),
                            loadoutItem: item
                        }
                    ]
                };
            }
            return {
                equippable: false,
                items: [
                    {
                        csItem: CS_Economy.find({
                            category,
                            free: true,
                            team,
                            type
                        }),
                        loadoutItem: undefined
                    }
                ]
            };
        }
        return {
            equippable: false,
            items: CS_Economy.filter({
                type,
                category,
                free: true,
                team
            }).map((defaultItem) => {
                const item = this.get({
                    item: {
                        model: defaultItem.model,
                        type
                    },
                    team
                });
                if (item !== undefined && !item.unequipped) {
                    return {
                        csItem: CS_Economy.getById(item.id),
                        loadoutItem: item
                    };
                }
                return {
                    csItem: defaultItem,
                    loadoutItem: undefined
                };
            })
        };
    }
    getEquippable({ category, model, team }) {
        const type = this.getTypeFromCategory(category);
        const item = this.get({
            item: { type, model },
            team
        });
        const isGlove = type === "glove";
        const isMusicKit = type === "musickit";
        if (item && CS_Loadout.isWithinLockTime(item.locktime)) {
            return {
                equippable: true,
                items: [
                    {
                        csItem: CS_Economy.find({
                            category,
                            free: true,
                            model,
                            team,
                            type
                        })
                    },
                    {
                        csItem: CS_Economy.getById(item.id),
                        loadoutItem: item
                    }
                ],
                locked: true
            };
        }
        return {
            equippable: model !== undefined || isMusicKit,
            items: CS_Economy.filter({
                base: model && !isGlove
                    ? undefined
                    : model && isGlove
                        ? false
                        : true,
                category,
                model,
                team,
                type
            }).map((item) => ({
                csItem: item
            })),
            locked: false
        };
    }
}
export { CS_Loadout };
