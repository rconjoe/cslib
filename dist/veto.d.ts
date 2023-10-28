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
/**
 * Represents a veto process for Counter-Strike maps.
 * @class
 */
export declare class CS_Veto {
    private maps;
    private actions;
    private pickedMaps;
    /**
     * Create a CS_Veto instance.
     *
     * @param {CS_VetoType} type - The type of veto process ("bo1", "bo3", "bo5", or "custom").
     * @param {CS_Map[]} maps - An array of maps to veto (must provide 7 maps).
     * @param {CS_VetoValue[]} [actions] - An array of veto actions (optional, but required for "custom" type).
     * @throws {Error} Throws an error if the input is invalid.
     */
    constructor(type: CS_VetoType, maps: CS_Map[], actions?: CS_VetoValue[]);
    private getAvailableMaps;
    private getMap;
    private getAvailableMapnames;
    /**
     * Get the current team making a veto action.
     *
     * @returns {number} The current team (0 or 1).
     */
    getCurrentTeam(): number;
    /**
     * Choose a map for veto.
     *
     * @param {string} [mapname] - The name of the map to choose (optional for random selection).
     * @returns {boolean} Returns true if the map was successfully chosen, false otherwise.
     */
    choose(mapname?: string): boolean;
    /**
     * Choose a random available map for veto.
     *
     * @returns {boolean} Returns true if a map was successfully chosen, false if no maps are available.
     * @throws {Error} Throws an error if a random map cannot be chosen.
     */
    random(): boolean;
    /**
     * Get the current state of map vetoes.
     *
     * @returns {CS_VetoMap[]} An array of CS_VetoMap objects representing the current state of maps.
     */
    getState(): CS_VetoMap[];
    /**
     * Get the list of maps in the order they were picked.
     *
     * @returns {string[]} An array of map names in the order they were picked.
     */
    getMaps(): string[];
    /**
     * Check if the veto process is done (no more actions remaining).
     *
     * @returns {boolean} Returns true if the veto process is done, false otherwise.
     */
    done(): boolean;
}
