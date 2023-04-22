import { CS_Item } from "./economy";
import { CS_Team } from "./teams";
export interface CS_InventoryItem {
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
export declare class CS_Inventory {
    static locktime: number;
    items: CS_InventoryItem[];
    static setLocktime(seconds: number): void;
    static isWithinLocktime(ms?: number): boolean;
    constructor(items?: CS_InventoryItem[]);
    private getTypeFromCategory;
    get({ item, team }: {
        item: Partial<CS_Item>;
        team: CS_Team;
    }): CS_InventoryItem | undefined;
    equip({ float, id, nametag, seed, stattrak, stickers, team }: CS_InventoryItem): CS_InventoryItem[];
    safeEquip(item: CS_InventoryItem): CS_InventoryItem[];
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
