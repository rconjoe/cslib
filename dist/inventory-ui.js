/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CS_Economy } from "./economy";
import { CS_Inventory } from "./inventory";
var CS_InventoryUI = /** @class */ (function (_super) {
    __extends(CS_InventoryUI, _super);
    function CS_InventoryUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CS_InventoryUI.prototype.getTypeFromCategory = function (category) {
        var _a;
        var type = (_a = CS_Economy.items.find(function (item) { return item.category === category; })) === null || _a === void 0 ? void 0 : _a.type;
        if (type === undefined) {
            throw new Error("type not found");
        }
        return type;
    };
    CS_InventoryUI.prototype.getEquipped = function (_a) {
        var _this = this;
        var category = _a.category, team = _a.team;
        var type = this.getTypeFromCategory(category);
        if (type !== "weapon") {
            var item = this.get({
                item: { type: type },
                team: team
            });
            if (item !== undefined && !item.unequipped) {
                return [CS_Economy.getById(item.id)];
            }
            return [
                CS_Economy.find({
                    free: true,
                    team: team,
                    type: type
                })
            ];
        }
        return CS_Economy.filter({ type: type, free: true }).map(function (defaultItem) {
            var item = _this.get({
                item: { model: defaultItem.model, type: type },
                team: team
            });
            if (item !== undefined && !item.unequipped) {
                return CS_Economy.getById(item.id);
            }
            return defaultItem;
        });
    };
    CS_InventoryUI.prototype.getEquippable = function (_a) {
        var category = _a.category, model = _a.model, team = _a.team;
        var type = this.getTypeFromCategory(category);
        var item = this.get({
            item: { type: type, model: model },
            team: team
        });
        if (item && CS_Inventory.isWithinLocktime(item.locktime)) {
            return [
                CS_Economy.find({
                    free: true,
                    team: team,
                    type: type
                }),
                CS_Economy.getById(item.id)
            ];
        }
        return CS_Economy.filter({
            base: true,
            model: model,
            team: team,
            type: type
        });
    };
    return CS_InventoryUI;
}(CS_Inventory));
export { CS_InventoryUI };
