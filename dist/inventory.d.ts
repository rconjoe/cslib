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
    canAddNewItem(): boolean;
    add(item: CS_InventoryItem): CS_Inventory;
    remove(at: number): CS_Inventory;
    equip(at: number, team?: CS_Team): CS_Inventory;
    unequip(at: number, team?: CS_Team): CS_Inventory;
    getAll(): {
        index: number;
        inventoryItem: CS_InventoryItem;
        csItem: import("./economy.js").CS_Item;
    }[];
    getItems(): CS_InventoryItem[];
}
