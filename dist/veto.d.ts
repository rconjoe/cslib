import { CS_Map } from "./maps.js";
export declare const CS_VETO_AVAILABLE = 0;
export declare const CS_VETO_PICK = 1;
export declare const CS_VETO_BAN = 2;
export type CS_VetoValue = 0 | 1 | 2;
export type CS_VetoType = "bo1" | "bo3" | "bo5" | "custom";
export interface CS_VetoMap {
    mapname: string;
    value: CS_VetoValue;
    team?: number;
}
export declare class CS_Veto {
    private maps;
    private actions;
    private pickedMaps;
    constructor(type: CS_VetoType, maps: CS_Map[], actions?: CS_VetoValue[]);
    private getAvailableMaps;
    private getMap;
    private getAvailableMapnames;
    getCurrentTeam(): number;
    choose(mapname?: string): boolean;
    random(): boolean;
    getState(): CS_VetoMap[];
    getMaps(): string[];
    done(): boolean;
}
