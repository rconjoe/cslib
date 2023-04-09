import { CS_Inventory } from "./inventory";
import { CS_Team } from "./teams";
interface CS_CategoryMenuItem {
    category: string;
    label: string;
    unique: boolean;
}
export declare const CS_CATEGORY_MENU: CS_CategoryMenuItem[];
export declare class CS_InventoryUI extends CS_Inventory {
    private getTypeFromCategory;
    static create(): import("./inventory").CS_InventoryItem[];
    getEquipped({ category, team }: {
        category: string;
        team: CS_Team;
    }): import("./economy").CS_Item[];
    getEquippable({ category, model, team }: {
        category: string;
        model?: string;
        team: CS_Team;
    }): import("./economy").CS_Item[];
}
export {};
