import { CS_roll } from "./economy-case.js";
import { CS_Team } from "./teams.js";
export declare const CS_INVENTORY_EQUIPPABLE_ITEMS: string[];
export interface CS_InventoryItem {
    equipped?: boolean;
    equippedCT?: boolean;
    equippedT?: boolean;
    id: number;
    nametag?: string;
    seed?: number;
    stattrak?: number;
    stickers?: (number | null)[];
    stickerswear?: (number | null)[];
    wear?: number;
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
    unlockCase(caseIndex: number, keyIndex?: number, rolledItem?: ReturnType<typeof CS_roll>): {
        state: CS_Inventory;
        rolledItem: ReturnType<typeof CS_roll>;
    };
    renameItem(toolIndex: number, targetIndex: number, nametag?: string): CS_Inventory;
    getItem(index: number): CS_InventoryItem | undefined;
    getItems(): CS_InventoryItem[];
    size(): number;
}
export declare class CS_MutableInventory {
    private items;
    private limit;
    constructor(items?: CS_InventoryItem[], limit?: number);
    full(): boolean;
    add(item: CS_InventoryItem): this;
    safeAdd(item: CS_InventoryItem): this;
    remove(at: number): this;
    equip(at: number, csTeam?: CS_Team): this;
    unequip(at: number, csTeam?: CS_Team): this;
    unlockCase(caseIndex: number, keyIndex?: number, rolledItem?: ReturnType<typeof CS_roll>): {
        state: CS_MutableInventory;
        rolledItem: ReturnType<typeof CS_roll>;
    };
    renameItem(toolIndex: number, targetIndex: number, nametag?: string): this;
    getItem(index: number): CS_InventoryItem | undefined;
    getItems(): CS_InventoryItem[];
    size(): number;
}
