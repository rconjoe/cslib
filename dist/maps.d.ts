/**
 * Interface representing a Counter-Strike map with mapname, name, and image properties.
 */
export interface CS_Map {
    /**
     * The mapname of the Counter-Strike map, typically in the format "de_mapname".
     */
    mapname: string;
    /**
     * The human-readable name of the Counter-Strike map.
     */
    name: string;
    /**
     * The image URL associated with the Counter-Strike map.
     */
    image: string;
}
/**
 * Counter-Strike map object for the Ancient map.
 */
export declare const CS_ANCIENT_MAP: CS_Map;
/**
 * Counter-Strike map object for the Anubis map.
 */
export declare const CS_ANUBIS_MAP: CS_Map;
/**
 * Counter-Strike map object for the Inferno map.
 */
export declare const CS_INFERNO_MAP: CS_Map;
/**
 * Counter-Strike map object for the Mirage map.
 */
export declare const CS_MIRAGE_MAP: CS_Map;
/**
 * Counter-Strike map object for the Dust 2 map.
 */
export declare const CS_DUST2_MAP: CS_Map;
/**
 * Counter-Strike map object for the Nuke map.
 */
export declare const CS_NUKE_MAP: CS_Map;
/**
 * Counter-Strike map object for the Overpass map.
 */
export declare const CS_OVERPASS_MAP: CS_Map;
/**
 * Counter-Strike map object for the Vertigo map.
 */
export declare const CS_VERTIGO_MAP: CS_Map;
/**
 * Counter-Strike map object for the Train map.
 */
export declare const CS_TRAIN_MAP: CS_Map;
/**
 * Counter-Strike map object for the Old Cobblestone map.
 */
export declare const CS_OLD_CBBLE_MAP: CS_Map;
/**
 * Counter-Strike map object for the Old Cache map.
 */
export declare const CS_OLD_CACHE_MAP: CS_Map;
/**
 * Array of Counter-Strike maps currently in the active map pool.
 */
export declare const CS_ACTIVE_MAP_POOL: CS_Map[];
/**
 * Array of all Counter-Strike maps, including both active and old maps.
 */
export declare const CS_ALL_MAPS: CS_Map[];
/**
 * Get the change level command for a Counter-Strike map, which can be used to switch to that map.
 * @param {CS_Map | string} map - The Counter-Strike map object or its mapname.
 * @returns {string} - The change level command.
 */
export declare function CS_getChangeLevelCommand(map: CS_Map | string): string;
/**
 * Get the name of a Counter-Strike map based on its mapname.
 * @returns {string} - The name of the map.
 */
export declare function CS_getMapnameName(mapname: string): string;
