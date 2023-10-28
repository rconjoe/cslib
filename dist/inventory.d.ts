import { CS_Team } from "./teams.js";
/**
 * Array of Counter-Strike inventory item types that can be equipped.
 */
export declare const CS_INVENTORY_EQUIPPABLE_ITEMS: string[];
/**
 * Represents a Counter-Strike inventory item.
 * @interface
 */
export interface CS_InventoryItem {
    /**
     * Indicates whether the item is equipped.
     */
    equipped?: boolean;
    /**
     * Indicates whether the item is equipped by the Counter-Terrorist team.
     */
    equippedCT?: boolean;
    /**
     * Indicates whether the item is equipped by the Counter-Terrorist team.
     */
    equippedT?: boolean;
    /**
     * The float value associated with the item.
     */
    float?: number;
    /**
     * The unique identifier of the item.
     */
    id: number;
    /**
     * The optional nametag associated with the item.
     */
    nametag?: string;
    /**
     * The seed value associated with the item.
     */
    seed?: number;
    /**
     * Indicates whether the item is a StatTrak item.
     */
    stattrak?: boolean;
    /**
     * An array of stickers applied to the item, with possible null values.
     */
    stickers?: (number | null)[];
    /**
     * An array of sticker float values associated with the item, with possible null values.
     */
    stickersfloat?: (number | null)[];
}
/**
 * Represents a Counter-Strike inventory.
 */
export declare class CS_Inventory {
    /**
     * An array containing Counter-Strike inventory items in the inventory.
     */
    private items;
    /**
     * The maximum limit of items that the inventory can hold.
     */
    private limit;
    /**
     * Create a new Counter-Strike inventory.
     * @param {CS_InventoryItem[]} items - An array of Counter-Strike inventory items.
     * @param {number} limit - The maximum limit of items in the inventory (default is 256).
     */
    constructor(items?: CS_InventoryItem[], limit?: number);
    /**
     * Check if the inventory is full.
     * @returns {boolean} - `true` if the inventory is full, `false` otherwise.
     */
    full(): boolean;
    /**
     * Add an item to the inventory.
     * @param {CS_InventoryItem} item - The item to add.
     * @returns {CS_Inventory} - A new inventory with the added item or the original inventory if it's full.
     */
    add(item: CS_InventoryItem): CS_Inventory;
    /**
     * Safely add an item to the inventory, catching and handling any exceptions.
     * @param {CS_InventoryItem} item - The item to add.
     * @returns {CS_Inventory} - A new inventory with the added item or the original inventory if an exception occurs.
     */
    safeAdd(item: CS_InventoryItem): CS_Inventory;
    /**
     * Remove an item from the inventory at a specified index.
     * @param {number} at - The index of the item to remove.
     * @returns {CS_Inventory} - A new inventory with the item removed or the original inventory if the index is out of bounds.
     */
    remove(at: number): CS_Inventory;
    /**
     * Equip an item in the inventory at a specified index.
     * @param {number} at - The index of the item to equip.
     * @param {CS_Team} [team] - The team to which the item should be equipped (optional).
     * @returns {CS_Inventory} - A new inventory with the item equipped or the original inventory if the operation is not allowed.
     */
    equip(at: number, team?: CS_Team): CS_Inventory;
    /**
     * Unequip an item in the inventory at a specified index.
     * @param {number} at - The index of the item to unequip.
     * @param {CS_Team} [team] - The team from which the item should be unequipped (optional).
     * @returns {CS_Inventory} - A new inventory with the item unequipped or the original inventory if the operation is not allowed.
     */
    unequip(at: number, team?: CS_Team): CS_Inventory;
    /**
     * Get an array of all items in the inventory.
     * @returns {CS_InventoryItem[]} - An array of all items in the inventory.
     */
    getItems(): CS_InventoryItem[];
}
