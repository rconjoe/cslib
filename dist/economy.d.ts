import { CS_Team } from "./teams";
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
type CS_EconomyPredicate = Partial<CS_Item> & {
    team?: CS_Team;
};
export declare class CS_Economy {
    static items: CS_Item[];
    static itemsDef: CS_ItemDefinition[];
    static itemsMap: Map<number, CS_Item>;
    static itemsDefMap: Map<number, CS_ItemDefinition>;
    static setItems(items: CS_Item[]): void;
    static setItemsDef(itemDefs: CS_ItemDefinition[]): void;
    static getById(id: number): CS_Item;
    static find(predicate: CS_EconomyPredicate): CS_Item;
    static filter(predicate: CS_EconomyPredicate): CS_Item[];
}
export {};
