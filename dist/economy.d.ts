import { CS_Team } from "./teams.js";
/**
 * The CS_Item interface is designed for use in client-facing interfaces and
 * contains generic information about a particular item.
 */
export interface CS_Item {
    base?: boolean;
    category: string;
    free?: boolean;
    id: number;
    image: string;
    localimage?: number;
    model?: string;
    name: string;
    rarity: string;
    teams?: CS_Team[];
    type: "agent" | "glove" | "melee" | "musickit" | "patch" | "pin" | "sticker" | "weapon";
}
/**
 * The CS_ItemDefinition interface contains more technical information about an
 * item and can be used for integration with SourceMod.
 */
export interface CS_ItemDefinition {
    def?: number;
    id: number;
    itemid?: number;
}
/**
 * Minimum allowed float value for Counter-Strike items.
 */
export declare const CS_MIN_FLOAT = 0.000001;
/**
 * Maximum allowed float value for Counter-Strike items.
 */
export declare const CS_MAX_FLOAT = 0.999999;
/**
 * Minimum float value for Factory New items.
 */
export declare const CS_MIN_FACTORY_NEW_FLOAT = 0.000001;
/**
 * Maximum float value for Factory New items.
 */
export declare const CS_MAX_FACTORY_NEW_FLOAT = 0.07;
/**
 * Minimum float value for Minimal Wear items.
 */
export declare const CS_MIN_MINIMAL_WEAR_FLOAT = 0.070001;
/**
 * Maximum float value for Minimal Wear items.
 */
export declare const CS_MAX_MINIMAL_WEAR_FLOAT = 0.15;
/**
 * Minimum float value for Field Tested items.
 */
export declare const CS_MIN_FIELD_TESTED_FLOAT = 0.150001;
/**
 * Maximum float value for Field Tested items.
 */
export declare const CS_MAX_FIELD_TESTED_FLOAT = 0.37;
/**
 * Minimum float value for Well Worn items.
 */
export declare const CS_MIN_WELL_WORN_FLOAT = 0.370001;
/**
 * Maximum float value for Well Worn items.
 */
export declare const CS_MAX_WELL_WORN_FLOAT = 0.44;
/**
 * Minimum float value for Battle Scarred items.
 */
export declare const CS_MIN_BATTLE_SCARRED_FLOAT = 0.440001;
/**
 * Maximum float value for Battle Scarred items.
 */
export declare const CS_MAX_BATTLE_SCARRED_FLOAT = 0.999999;
/**
 * Maximum float value for Battle Scarred items.
 */
export declare const CS_MIN_SEED = 1;
/**
 * Maximum seed value for Counter-Strike items.
 */
export declare const CS_MAX_SEED = 1000;
/**
 * Array of Counter-Strike item types that have a float value.
 */
export declare const CS_FLOATABLE_ITEMS: string[];
/**
 * Array of Counter-Strike item types that can have nametags.
 */
export declare const CS_NAMETAGGABLE_ITEMS: string[];
/**
 * Array of Counter-Strike item types that can have seeds.
 */
export declare const CS_SEEDABLE_ITEMS: string[];
/**
 * Array of Counter-Strike item types that can be StatTrak.
 */
export declare const CS_STATTRAKABLE_ITEMS: string[];
/**
 * Array of Counter-Strike item types that can have stickers.
 */
export declare const CS_STICKERABLE_ITEMS: string[];
/**
 * Regular expression for validating nametags.
 */
export declare const CS_NAMETAG_RE: RegExp;
/**
 * Minimum float value for stickers.
 */
export declare const CS_MIN_STICKER_FLOAT = 0;
/**
 * Maximum float value for stickers.
 */
export declare const CS_MAX_STICKER_FLOAT = 0.9;
/**
 * Default generated heavy value.
 */
export declare const CS_DEFAULT_GENERATED_HEAVY = 1;
/**
 * Default generated medium value.
 */
export declare const CS_DEFAULT_GENERATED_MEDIUM = 2;
/**
 * Default generated light value.
 */
export declare const CS_DEFAULT_GENERATED_LIGHT = 4;
/**
 * A predicate to filter Counter-Strike items based on various attributes.
 */
type CS_EconomyPredicate = Partial<CS_Item> & {
    team?: CS_Team;
};
/**
 * Represents a Counter-Strike category menu item.
 */
export interface CS_CategoryMenuItem {
    category: string;
    label: string;
    unique: boolean;
}
/**
 * Array of category menu items for Counter-Strike items.
 */
export declare const CS_CATEGORY_MENU: CS_CategoryMenuItem[];
/**
 * Represents the Counter-Strike Economy.
 */
export declare class CS_Economy {
    /**
     * Array of all Counter-Strike items.
     */
    static items: CS_Item[];
    /**
     * Array of all Counter-Strike item definitions.
     */
    static definitions: CS_ItemDefinition[];
    /**
     * Map of Counter-Strike item IDs to their corresponding items.
     */
    static itemMap: Map<number, CS_Item>;
    /**
     * Map of Counter-Strike item definition IDs to their corresponding definitions.
     */
    static definitionMap: Map<number, CS_ItemDefinition>;
    /**
     * Set of Counter-Strike sticker categories.
     */
    static categories: Set<string>;
    /**
     * Array of Counter-Strike sticker items.
     */
    static stickers: CS_Item[];
    /**
     * Set the Counter-Strike items and their definitions.
     * @param {CS_Item[]} items - An array of Counter-Strike items.
     * @param {CS_ItemDefinition[]} [definitions] - An array of Counter-Strike item definitions (optional).
     */
    static setItems(items: CS_Item[], definitions?: CS_ItemDefinition[]): void;
    /**
     * Get a Counter-Strike item by its ID.
     * @param {number} id - The ID of the Counter-Strike item to retrieve.
     * @returns {CS_Item} - The Counter-Strike item.
     */
    static getById(id: number): CS_Item;
    /**
     * Get a Counter-Strike item definition by its ID.
     * @param {number} id - The ID of the Counter-Strike item definition to retrieve.
     * @returns {CS_ItemDefinition} - The Counter-Strike item definition.
     */
    static getDefById(id: number): CS_ItemDefinition;
}
/**
 * Find a Counter-Strike item based on the given predicate.
 * @param {CS_EconomyPredicate} predicate - A predicate to filter Counter-Strike items.
 * @returns {CS_Item} - The Counter-Strike item matching the predicate.
 */
export declare function CS_findItem(predicate: CS_EconomyPredicate): CS_Item;
/**
 * Filter Counter-Strike items based on the given predicate.
 * @param {CS_EconomyPredicate} predicate - A predicate to filter Counter-Strike items.
 * @returns {CS_Item[]} - An array of Counter-Strike items matching the predicate.
 */
export declare function CS_filterItems(predicate: CS_EconomyPredicate): CS_Item[];
/**
 * Check if a Counter-Strike item has a float value.
 * @param {CS_Item} item - The Counter-Strike item to check.
 * @returns {boolean} - `true` if the item has a float value, `false` otherwise.
 */
export declare function CS_hasFloat(item: CS_Item): boolean;
/**
 * Validate a float value for Counter-Strike items.
 * @param {number} float - The float value to validate.
 * @param {CS_Item} [forItem] - The Counter-Strike item for which the float is being validated (optional).
 * @returns {boolean} - `true` if the float value is valid, otherwise throws an error.
 */
export declare function CS_validateFloat(float: number, forItem?: CS_Item): boolean;
/**
 * Safe version of `CS_validateFloat` wrapped in a try-catch block to handle exceptions.
 * @param {number} float - The float value to validate.
 * @returns {boolean} - `true` if the float value is valid, otherwise returns `false`.
 */
export declare const CS_safeValidateFloat: (float: number, forItem?: CS_Item | undefined) => boolean;
/**
 * Check if a Counter-Strike item has a seed value.
 * @param {CS_Item} item - The Counter-Strike item to check.
 * @returns {boolean} - `true` if the item has a seed value, `false` otherwise.
 */
export declare function CS_hasSeed(item: CS_Item): boolean;
/**
 * Validate a seed value for Counter-Strike items.
 * @param {number} seed - The seed value to validate.
 * @param {CS_Item} [forItem] - The Counter-Strike item for which the seed is being validated (optional).
 * @returns {boolean} - `true` if the seed value is valid, otherwise throws an error.
 */
export declare function CS_validateSeed(seed: number, forItem?: CS_Item): boolean;
/**
 * Safe version of `CS_validateSeed` wrapped in a try-catch block to handle exceptions.
 * @param {number} seed - The seed value to validate.
 * @returns {boolean} - `true` if the seed value is valid, otherwise returns `false`.
 */
export declare const CS_safeValidateSeed: (seed: number, forItem?: CS_Item | undefined) => boolean;
/**
 * Check if a Counter-Strike item can have stickers.
 * @param {CS_Item} item - The Counter-Strike item to check.
 * @returns {boolean} - `true` if the item can have stickers, `false` otherwise.
 */
export declare function CS_hasStickers(item: CS_Item): boolean;
/**
 * Validate stickers for a Counter-Strike item.
 * @param {CS_Item} item - The Counter-Strike item for which stickers are being validated.
 * @param {(number | null)[]} stickers - An array of sticker IDs, with null values for empty slots.
 * @param {(number | null)[]} [stickerswear] - An array of sticker wear values (optional).
 * @returns {boolean} - `true` if the stickers are valid, otherwise throws an error.
 */
export declare function CS_validateStickers(item: CS_Item, stickers: (number | null)[], stickerswear?: (number | null)[]): boolean;
/**
 * Check if a Counter-Strike item can have a nametag.
 * @param {CS_Item} item - The Counter-Strike item to check.
 * @returns {boolean} - `true` if the item can have a nametag, `false` otherwise.
 */
export declare function CS_hasNametag(item: CS_Item): boolean;
/**
 * Validate a nametag for a Counter-Strike item.
 * @param {string} nametag - The nametag to validate.
 * @param {CS_Item} [forItem] - The Counter-Strike item for which the nametag is being validated (optional).
 * @returns {boolean} - `true` if the nametag is valid, otherwise throws an error.
 */
export declare function CS_validateNametag(nametag: string, forItem?: CS_Item): boolean;
/**
 * Safe version of `CS_validateNametag` wrapped in a try-catch block to handle exceptions.
 * @param {string} nametag - The nametag to validate.
 * @returns {boolean} - `true` if the nametag is valid, otherwise returns `false`.
 */
export declare const CS_safeValidateNametag: (nametag: string, forItem?: CS_Item | undefined) => boolean;
/**
 * Check if a Counter-Strike item can have StatTrak.
 * @param {CS_Item} item - The Counter-Strike item to check.
 * @returns {boolean} - `true` if the item can be StatTrak, `false` otherwise.
 */
export declare function CS_hasStatTrak(item: CS_Item): boolean;
/**
 * Validate StatTrak status for a Counter-Strike item.
 * @param {boolean} stattrak - The StatTrak status to validate.
 * @param {CS_Item} forItem - The Counter-Strike item for which StatTrak status is being validated.
 * @returns {boolean} - `true` if the StatTrak status is valid, otherwise throws an error.
 */
export declare function CS_validateStatTrak(stattrak: boolean, forItem: CS_Item): boolean;
/**
 * Get the float label for a Counter-Strike item based on its float value.
 * @param {number} float - The float value of the item.
 * @returns {string} - The float label ("FN", "MW", "FT", "WW", or "BS").
 */
export declare function CS_getFloatLabel(float: number): string;
/**
 * Get a list of Counter-Strike sticker categories.
 * @returns {string[]} - An array of Counter-Strike sticker categories.
 */
export declare function CS_getStickerCategories(): string[];
/**
 * Get an array of Counter-Strike sticker items.
 * @returns {CS_Item[]} - An array of Counter-Strike sticker items.
 */
export declare function CS_getStickers(): CS_Item[];
/**
 * Resolve the image URL for a Counter-Strike item.
 * @param {string} baseUrl - The base URL for images.
 * @param {CS_Item | number} csItem - The Counter-Strike item or its ID.
 * @param {number} [float] - The float value of the item (optional).
 * @returns {string} - The resolved image URL.
 */
export declare function CS_resolveItemImage(baseUrl: string, csItem: CS_Item | number, float?: number): string;
export {};
