/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { CS_Economy } from "./economy";
import { CS_TEAM_NONE } from "./teams";
var CAN_EQUIP = ["glove", "melee", "musickit", "weapon"];
var HAS_FLOAT = ["glove", "melee", "weapon"];
var HAS_NAMETAG = ["melee", "weapon"];
var HAS_SEED = ["glove", "melee"];
var HAS_STICKERS = ["weapon"];
export var nametagRE = /^[A-Za-z0-9`!@#$%^&*-+=(){}\[\]\/\\,.?:;'_][A-Za-z0-9`!@#$%^&*-+=(){}\[\]\/\\,.?:;'_\s|]{0,19}$/;
export var CS_Inventory = /** @class */ (function () {
    function CS_Inventory(items) {
        this.items = [];
        this.items = items;
    }
    CS_Inventory.setLocktime = function (seconds) {
        CS_Inventory.locktime = 1000 * seconds;
    };
    CS_Inventory.isWithinLocktime = function (ms) {
        return ms !== undefined && Date.now() - ms < CS_Inventory.locktime;
    };
    CS_Inventory.prototype.get = function (_a) {
        var item = _a.item, team = _a.team;
        return this.items.find(function (equipped) {
            var other = CS_Economy.getById(equipped.id);
            return (other.type === item.type &&
                other.model === item.model &&
                (equipped.team === team || item.teams === undefined));
        });
    };
    CS_Inventory.prototype.equip = function (_a) {
        var float = _a.float, id = _a.id, nametag = _a.nametag, seed = _a.seed, stickers = _a.stickers, team = _a.team;
        var item = CS_Economy.getById(id);
        if (item.teams === undefined) {
            team = CS_TEAM_NONE;
        }
        if (!CAN_EQUIP.includes(item.type)) {
            throw new Error("you cannot equip this item");
        }
        var equipped = this.get({ item: item, team: team });
        if (equipped !== undefined &&
            CS_Inventory.isWithinLocktime(equipped.locktime)) {
            if (!item.free && item.id !== equipped.id) {
                throw new Error("item is locked");
            }
            return new CS_Inventory(this.items.map(function (other) {
                return other === equipped
                    ? __assign(__assign({}, other), { unequipped: item.free ? true : undefined }) : other;
            }));
        }
        var items = this.items.filter(function (other) { return other !== equipped; });
        if (item.free) {
            return new CS_Inventory(items);
        }
        if (float !== undefined) {
            if (!HAS_FLOAT.includes(item.type)) {
                throw new Error("invalid float");
            }
            if (float < 0.000001 || float > 0.999999) {
                throw new Error("invalid float");
            }
        }
        if (seed !== undefined) {
            if (!HAS_SEED.includes(item.type)) {
                throw new Error("invalid seed");
            }
            if (seed < 1 || seed > 1000) {
                throw new Error("invalid seed");
            }
        }
        if (stickers !== undefined) {
            if (!HAS_STICKERS.includes(item.type)) {
                throw new Error("invalid stickers");
            }
            if (stickers.length > 4) {
                throw new Error("invalid stickers");
            }
            for (var _i = 0, stickers_1 = stickers; _i < stickers_1.length; _i++) {
                var sticker = stickers_1[_i];
                if (CS_Economy.getById(sticker).type !== "sticker") {
                    throw new Error("invalid stickers");
                }
            }
        }
        if (nametag !== undefined) {
            if (!HAS_NAMETAG.includes(item.type)) {
                throw new Error("invalid nametag");
            }
            if (!nametagRE.test(nametag)) {
                throw new Error("invalid nametag");
            }
        }
        return new CS_Inventory(items.concat({
            float: float,
            id: item.id,
            nametag: nametag,
            seed: seed,
            stickers: stickers,
            team: team,
            locktime: CS_Inventory.locktime > 0 ? Date.now() : undefined
        }));
    };
    CS_Inventory.prototype.safeEquip = function (item) {
        try {
            return this.equip(item);
        }
        catch (_a) {
            return this;
        }
    };
    CS_Inventory.locktime = 0;
    return CS_Inventory;
}());
