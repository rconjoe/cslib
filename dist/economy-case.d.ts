import { CS_Item } from "./economy.js";
export declare const CS_RARITY_COLORS: Record<string, string>;
export declare const CS_RARITY_ODDS: Record<string, number>;
export declare const CS_RARITY_ORDER: string[];
export declare function CS_randomFloat(min: number, max: number): number;
export declare function CS_randomInt(min: number, max: number): number;
export declare function CS_roll({ type, contents, rarecontents }: CS_Item): {
    csItem: CS_Item;
    attributes: {
        seed: number | undefined;
        wear: number | undefined;
        stattrak: number | undefined;
    };
    special: boolean;
};
