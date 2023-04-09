import { CS_Inventory } from "./inventory";
import { CS_Team } from "./teams";
export declare class CS_InventoryUI extends CS_Inventory {
    private getTypeFromCategory;
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
