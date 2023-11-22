import { CS_Item } from "./economy.js";
export declare const CS_RARITY_COLORS: Record<string, string>;
export declare const CS_RARITY_ODDS: Record<string, number>;
export declare const CS_RARITY_COLOR_DEFAULT = 0;
export declare const CS_RARITY_COLOR_ORDER: Record<string, number | undefined>;
export declare const CS_RARITY_ORDER: string[];
export declare function CS_randomFloat(min: number, max: number): number;
export declare function CS_randomInt(min: number, max: number): number;
export declare function CS_getCaseItems(csCaseItem: CS_Item | number): Record<string, CS_Item[]>;
export declare function CS_listCaseItems(csCaseItem: CS_Item | number): CS_Item[];
export declare function CS_roll(csCaseItem: CS_Item | number): {
    attributes: {
        seed: number | undefined;
        wear: number | undefined;
        stattrak: number | undefined;
    };
    csItem: CS_Item;
    rarity: string;
    special: boolean;
};
