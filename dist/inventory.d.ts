import { CS_Item } from "./economy";
import { CS_Team } from "./teams";
export interface CS_InventoryItem {
    float?: number;
    id: number;
    locktime?: number;
    nametag?: string;
    seed?: number;
    stattrak?: boolean;
    stickers?: number[];
    team: CS_Team;
    unequipped?: boolean;
}
export declare const nametagRE: RegExp;
export declare class CS_Inventory {
    static locktime: number;
    items: CS_InventoryItem[];
    static setLocktime(seconds: number): void;
    static isWithinLocktime(ms?: number): boolean;
    constructor(items?: CS_InventoryItem[]);
    get({ item, team }: {
        item: Partial<CS_Item>;
        team: CS_Team;
    }): CS_InventoryItem | undefined;
    equip({ float, id, nametag, seed, stattrak, stickers, team }: CS_InventoryItem): CS_Inventory;
    safeEquip(item: CS_InventoryItem): CS_Inventory;
}
