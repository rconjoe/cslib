export interface CS_Map {
    mapname: string;
    name: string;
    image: string;
}
export declare const CS_ANCIENT_MAP: CS_Map;
export declare const CS_ANUBIS_MAP: CS_Map;
export declare const CS_INFERNO_MAP: CS_Map;
export declare const CS_MIRAGE_MAP: CS_Map;
export declare const CS_DUST2_MAP: CS_Map;
export declare const CS_NUKE_MAP: CS_Map;
export declare const CS_OVERPASS_MAP: CS_Map;
export declare const CS_VERTIGO_MAP: CS_Map;
export declare const CS_OLD_CBBLE_MAP: CS_Map;
export declare const CS_OLD_CACHE_MAP: CS_Map;
export declare const CS_ACTIVE_MAP_POOL: CS_Map[];
export declare const CS_ALL_MAPS: CS_Map[];
export declare function CS_getMapCommand(map: CS_Map): string;
