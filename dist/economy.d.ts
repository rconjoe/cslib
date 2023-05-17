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
    model?: string;
    name: string;
    rarity: string;
    teams?: CS_Team[];
    type: "glove" | "melee" | "musickit" | "sticker" | "weapon";
}
/**
 * The CS_ItemDefinition interface contains more technical information about an
 * item and can be used for integration with Sourcemod.
 */
export interface CS_ItemDefinition {
    classname?: string;
    def?: number;
    id: number;
    musicid?: number;
    paintid?: number;
    stickerid?: number;
}
export declare const CS_MIN_FLOAT = 0.000001;
export declare const CS_MAX_FLOAT = 0.999999;
export declare const CS_MIN_FACTORY_NEW_FLOAT = 0.000001;
export declare const CS_MAX_FACTORY_NEW_FLOAT = 0.07;
export declare const CS_MIN_MINIMAL_WEAR_FLOAT = 0.070001;
export declare const CS_MAX_MINIMAL_WEAR_FLOAT = 0.15;
export declare const CS_MIN_FIELD_TESTED_FLOAT = 0.150001;
export declare const CS_MAX_FIELD_TESTED_FLOAT = 0.37;
export declare const CS_MIN_WELL_WORN_FLOAT = 0.370001;
export declare const CS_MAX_WELL_WORN_FLOAT = 0.44;
export declare const CS_MIN_BATTLE_SCARRED_FLOAT = 0.440001;
export declare const CS_MAX_BATTLE_SCARRED_FLOAT = 0.999999;
export declare const CS_MIN_SEED = 1;
export declare const CS_MAX_SEED = 1000;
export declare const CS_FLOATABLE_ITEMS: string[];
export declare const CS_NAMETAGGABLE_ITEMS: string[];
export declare const CS_SEEDABLE_ITEMS: string[];
export declare const CS_STATTRAKABLE_ITEMS: string[];
export declare const CS_STICKERABLE_ITEMS: string[];
export declare const CS_nametagRE: RegExp;
type CS_EconomyPredicate = Partial<CS_Item> & {
    team?: CS_Team;
};
export interface CS_CategoryMenuItem {
    category: string;
    label: string;
    unique: boolean;
}
export declare const CS_CATEGORY_MENU: CS_CategoryMenuItem[];
export declare class CS_Economy {
    static items: CS_Item[];
    static itemsDef: CS_ItemDefinition[];
    static itemsMap: Map<number, CS_Item>;
    static itemsDefMap: Map<number, CS_ItemDefinition>;
    static stickerCategories: string[];
    static stickers: CS_Item[];
    static setItems(items: CS_Item[]): void;
    static setItemsDef(itemDefs: CS_ItemDefinition[]): void;
    static getById(id: number): CS_Item;
    static getDefById(id: number): CS_ItemDefinition;
    static find(predicate: CS_EconomyPredicate): CS_Item;
    static filter(predicate: CS_EconomyPredicate): CS_Item[];
    static hasFloat(item: CS_Item): boolean;
    static validateFloat(item: CS_Item, float: number): void;
    static hasSeed(item: CS_Item): boolean;
    static validateSeed(item: CS_Item, seed: number): void;
    static hasStickers(item: CS_Item): boolean;
    static validateStickers(item: CS_Item, stickers: (number | null)[]): void;
    static hasNametag(item: CS_Item): boolean;
    static validateNametag(item: CS_Item, nametag: string): void;
    static hasStattrak(item: CS_Item): boolean;
    static validateStattrak(item: CS_Item, stattrak: boolean): void;
    static getFloatLabel(float: number): "FactoryNew" | "MinimalWear" | "FieldTested" | "WellWorn" | "BattleScarred";
    static getStickerCategories(): string[];
    static getStickers(): CS_Item[];
}
export {};
