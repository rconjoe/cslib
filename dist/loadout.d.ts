import { CS_Item } from "./economy.js";
import { CS_Team } from "./teams.js";
export interface CS_LoadoutItem {
    float?: number;
    id: number;
    locktime?: number;
    nametag?: string;
    seed?: number;
    stattrak?: boolean;
    stickers?: (number | null)[];
    team: CS_Team;
    unequipped?: boolean;
}
export declare const CS_EQUIPABLE_ITEMS: string[];
export declare const CS_FLOATABLE_ITEMS: string[];
export declare const CS_NAMETAGGABLE_ITEMS: string[];
export declare const CS_SEEDABLE_ITEMS: string[];
export declare const CS_STATTRAKABLE_ITEMS: string[];
export declare const CS_STICKERABLE_ITEMS: string[];
export declare const CS_nametagRE: RegExp;
export declare class CS_Loadout {
    static locktime: number;
    items: CS_LoadoutItem[];
    static setLockTime(seconds: number): void;
    static isWithinLockTime(ms?: number): boolean;
    constructor(items?: CS_LoadoutItem[]);
    private getTypeFromCategory;
    get({ item, team }: {
        item: Partial<CS_Item>;
        team: CS_Team;
    }): CS_LoadoutItem | undefined;
    equip({ float, id, nametag, seed, stattrak, stickers, team }: CS_LoadoutItem): CS_Loadout;
    safeEquip(item: CS_LoadoutItem): CS_Loadout;
    getEquipped({ category, team }: {
        category: string;
        team: CS_Team;
    }): CS_Item[];
    getEquippable({ category, model, team }: {
        category: string;
        model?: string;
        team: CS_Team;
    }): CS_Item[];
}
