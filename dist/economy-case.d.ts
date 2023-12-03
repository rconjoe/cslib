import { CS_Item } from "./economy.js";
export declare const CS_RARITY_COLORS: Record<string, string>;
export declare const CS_RARITY_FOR_SOUNDS: Record<string, string>;
export declare const CS_RARITY_COLOR_DEFAULT = 0;
export declare const CS_RARITY_COLOR_ORDER: Record<string, number | undefined>;
export declare const CS_RARITY_ORDER: string[];
export declare const CS_BASE_ODD = 0.8;
export declare const CS_STATTRAK_ODD: number;
export declare function CS_randomFloat(min: number, max: number): number;
export declare function CS_randomInt(min: number, max: number): number;
export declare function CS_getCaseContents(caseItem: CS_Item | number): Record<string, CS_Item[]>;
export declare function CS_listCaseContents(caseItem: CS_Item | number, hideSpecialContents?: boolean): CS_Item[];
/**
 * @see https://www.csgo.com.cn/news/gamebroad/20170911/206155.shtml
 */
export declare function CS_unlockCase(caseItem: CS_Item | number): {
    attributes: {
        seed: number | undefined;
        stattrak: number | undefined;
        wear: number | undefined;
    };
    id: number;
    rarity: string;
    special: boolean;
};
export declare function CS_validateUnlockedItem(caseItem: number | CS_Item, { id, attributes: { seed, stattrak, wear } }: ReturnType<typeof CS_unlockCase>): void;
