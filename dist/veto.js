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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var CS_VETO_AVAILABLE = 0;
export var CS_VETO_PICK = 1;
export var CS_VETO_BAN = 2;
var CS_Veto = /** @class */ (function () {
    function CS_Veto(type, maps, actions) {
        this.pickedMaps = [];
        if (type !== "custom" && actions !== undefined) {
            console.warn('stack provided, but the type is not "custom".');
        }
        if (type === "custom" && actions === undefined) {
            throw new Error("provide the stack for the custom type.");
        }
        if (maps.length !== 7) {
            throw new Error("you need to provide 7 maps to veto.");
        }
        if (actions !== undefined && actions.length !== 6) {
            throw new Error("ou need to provide 6 actions to veto.");
        }
        this.maps = maps.map(function (map) { return ({
            mapname: map.mapname,
            value: CS_VETO_AVAILABLE
        }); });
        switch (type) {
            case "bo1":
                this.actions = [
                    CS_VETO_BAN,
                    CS_VETO_BAN,
                    CS_VETO_BAN,
                    CS_VETO_BAN,
                    CS_VETO_BAN,
                    CS_VETO_BAN
                ];
                break;
            case "bo3":
                this.actions = [
                    CS_VETO_BAN,
                    CS_VETO_BAN,
                    CS_VETO_PICK,
                    CS_VETO_PICK,
                    CS_VETO_BAN,
                    CS_VETO_BAN
                ];
                break;
            case "bo5":
                this.actions = [
                    CS_VETO_BAN,
                    CS_VETO_BAN,
                    CS_VETO_PICK,
                    CS_VETO_PICK,
                    CS_VETO_PICK,
                    CS_VETO_PICK
                ];
                break;
            case "custom":
                this.actions = actions;
                break;
        }
    }
    CS_Veto.prototype.getAvailableMaps = function () {
        return this.maps.filter(function (map) { return map.value === CS_VETO_AVAILABLE; });
    };
    CS_Veto.prototype.getAvailableMapnames = function () {
        return this.getAvailableMaps().map(function (map) { return map.mapname; });
    };
    CS_Veto.prototype.getMap = function (mapname) {
        return this.maps.find(function (map) { return map.mapname === mapname; });
    };
    CS_Veto.prototype.getCurrentTeam = function () {
        return this.actions.length % 2;
    };
    CS_Veto.prototype.choose = function (mapname) {
        if (this.actions.length === 0) {
            return false;
        }
        if (mapname === undefined) {
            return this.random();
        }
        var map = this.getMap(mapname);
        if (map === undefined || map.value !== CS_VETO_AVAILABLE) {
            return false;
        }
        var team = this.getCurrentTeam();
        var value = this.actions.shift();
        if (value === undefined) {
            return false;
        }
        if (value === CS_VETO_PICK) {
            this.pickedMaps.push(mapname);
        }
        this.maps = this.maps.map(function (map) {
            if (map.mapname !== mapname) {
                return map;
            }
            return __assign(__assign({}, map), { value: value, team: team });
        });
        return true;
    };
    CS_Veto.prototype.random = function () {
        var available = this.getAvailableMapnames();
        if (!available.length) {
            return false;
        }
        var index = Math.floor(Math.random() * available.length);
        var mapname = available[index];
        if (mapname === undefined) {
            throw new Error("unable to get random mapname.");
        }
        return this.choose(mapname);
    };
    CS_Veto.prototype.getMaps = function () {
        if (this.actions.length > 0) {
            return this.pickedMaps;
        }
        var available = this.getAvailableMapnames();
        return __spreadArray(__spreadArray([], this.pickedMaps, true), available, true);
    };
    return CS_Veto;
}());
export { CS_Veto };
