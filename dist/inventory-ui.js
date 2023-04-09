/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { CS_Economy } from "./economy";
import { CS_Inventory } from "./inventory";
export const CS_ITEM_CATEGORIES = [
    {
        label: "Pistol",
        category: "secondary",
        unique: false
    },
    {
        label: "SMG",
        category: "smg",
        unique: false
    },
    {
        label: "Heavy",
        category: "heavy",
        unique: false
    },
    {
        label: "Rifle",
        category: "rifle",
        unique: false
    },
    {
        label: "Knife",
        category: "melee",
        unique: true
    },
    {
        label: "Glove",
        category: "glove",
        unique: true
    },
    {
        label: "Music Kit",
        category: "musickit",
        unique: true
    }
];
export class CS_InventoryUI extends CS_Inventory {
    getTypeFromCategory(category) {
        const type = CS_Economy.items.find((item) => item.category === category)?.type;
        if (type === undefined) {
            throw new Error("type not found");
        }
        return type;
    }
    getEquipped({ category, team }) {
        const type = this.getTypeFromCategory(category);
        if (type !== "weapon") {
            const item = this.get({
                item: { type },
                team
            });
            if (item !== undefined && !item.unequipped) {
                return [CS_Economy.getById(item.id)];
            }
            return [
                CS_Economy.find({
                    category,
                    free: true,
                    team,
                    type
                })
            ];
        }
        return CS_Economy.filter({ type, free: true }).map((defaultItem) => {
            const item = this.get({
                item: { model: defaultItem.model, type },
                team
            });
            if (item !== undefined && !item.unequipped) {
                return CS_Economy.getById(item.id);
            }
            return defaultItem;
        });
    }
    getEquippable({ category, model, team }) {
        const type = this.getTypeFromCategory(category);
        const item = this.get({
            item: { type, model },
            team
        });
        const isGlove = type === "glove";
        if (item && CS_Inventory.isWithinLocktime(item.locktime)) {
            return [
                CS_Economy.find({
                    category,
                    free: true,
                    team,
                    type
                }),
                CS_Economy.getById(item.id)
            ];
        }
        return CS_Economy.filter({
            base: model && !isGlove ? undefined : model && isGlove ? false : true,
            category,
            model,
            team,
            type
        });
    }
}
