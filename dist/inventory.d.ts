import { CS_unlockCase } from "./economy-case.js";
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
    add(inventoryItem: CS_InventoryItem): this;
    safeAdd(inventoryItem: CS_InventoryItem): this;
    remove(index: number): this;
    equip(index: number, team?: CS_Team): this;
    unequip(index: number, team?: CS_Team): this;
    unlockCase(caseIndex: number, keyIndex?: number, unlockedItem?: ReturnType<typeof CS_unlockCase>): {
        attributes: {
            seed: number | undefined;
            stattrak: number | undefined;
            wear: number | undefined;
        };
        item: number;
        rarity: string;
        special: boolean;
    };
    renameItem(toolIndex: number, targetIndex: number, nametag?: string): this;
    get(index: number): CS_InventoryItem | undefined;
    getAll(): CS_InventoryItem[];
    size(): number;
}
