/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
export const CS_VETO_AVAILABLE = 0;
export const CS_VETO_PICK = 1;
export const CS_VETO_BAN = 2;
export class CS_Veto {
    maps;
    actions;
    pickedMaps = [];
    constructor(type, maps, actions) {
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
            throw new Error("you need to provide 6 actions to veto.");
        }
        this.maps = maps.map((map) => ({
            mapname: map.mapname,
            value: CS_VETO_AVAILABLE
        }));
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
    getAvailableMaps() {
        return this.maps.filter((map) => map.value === CS_VETO_AVAILABLE);
    }
    getMap(mapname) {
        return this.maps.find((map) => map.mapname === mapname);
    }
    getAvailableMapnames() {
        return this.getAvailableMaps().map((map) => map.mapname);
    }
    getCurrentTeam() {
        return this.actions.length % 2;
    }
    choose(mapname) {
        if (this.actions.length === 0) {
            return false;
        }
        if (mapname === undefined) {
            return this.random();
        }
        const map = this.getMap(mapname);
        if (map === undefined || map.value !== CS_VETO_AVAILABLE) {
            return false;
        }
        const team = this.getCurrentTeam();
        const value = this.actions.shift();
        if (value === undefined) {
            return false;
        }
        if (value === CS_VETO_PICK) {
            this.pickedMaps.push(mapname);
        }
        this.maps = this.maps.map((map) => {
            if (map.mapname !== mapname) {
                return map;
            }
            return {
                ...map,
                value,
                team
            };
        });
        return true;
    }
    random() {
        const available = this.getAvailableMapnames();
        if (!available.length) {
            return false;
        }
        const index = Math.floor(Math.random() * available.length);
        const mapname = available[index];
        if (mapname === undefined) {
            throw new Error("unable to get random mapname.");
        }
        return this.choose(mapname);
    }
    getState() {
        return this.maps;
    }
    getMaps() {
        if (this.actions.length > 0) {
            return this.pickedMaps;
        }
        const available = this.getAvailableMapnames();
        return [...this.pickedMaps, ...available];
    }
    done() {
        return this.actions.length === 0;
    }
}
