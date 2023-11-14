import { CS_Team } from "./teams.js";
export declare const CS_INVENTORY_EQUIPPABLE_ITEMS: string[];
export interface CS_InventoryItem {
    equipped?: boolean;
    equippedCT?: boolean;
    equippedT?: boolean;
    float?: number;
    id: number;
    nametag?: string;
    seed?: number;
    stattrak?: boolean;
    stickers?: (number | null)[];
    stickersfloat?: (number | null)[];
}
export declare class CS_Inventory {
    private items;
    private limit;
    constructor(items?: CS_InventoryItem[], limit?: number);
    full(): boolean;
    add(item: CS_InventoryItem): CS_Inventory;
    safeAdd(item: CS_InventoryItem): CS_Inventory;
    remove(at: number): CS_Inventory;
    equip(at: number, csTeam?: CS_Team): CS_Inventory;
    unequip(at: number, csTeam?: CS_Team): CS_Inventory;
    getItems(): CS_InventoryItem[];
}
export declare class CS_MutableInventory {
    private items;
    private limit;
    constructor(items?: CS_InventoryItem[], limit?: number);
    full(): boolean;
    add(item: CS_InventoryItem): boolean;
    safeAdd(item: CS_InventoryItem): boolean;
    remove(at: number): boolean;
    equip(at: number, csTeam?: CS_Team): boolean;
    unequip(at: number, csTeam?: CS_Team): boolean;
    getItems(): CS_InventoryItem[];
}
