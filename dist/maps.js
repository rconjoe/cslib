/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
export const CS_ANCIENT_MAP = {
    mapname: "de_ancient",
    name: "Ancient",
    image: "/de_ancient.jpg"
};
export const CS_ANUBIS_MAP = {
    mapname: "de_anubis",
    name: "Anubis",
    image: "/de_anubis.jpg"
};
export const CS_INFERNO_MAP = {
    mapname: "de_inferno",
    name: "Inferno",
    image: "/de_inferno.jpg"
};
export const CS_MIRAGE_MAP = {
    mapname: "de_mirage",
    name: "Mirage",
    image: "/de_mirage.jpg"
};
export const CS_DUST2_MAP = {
    mapname: "de_dust2",
    name: "Dust 2",
    image: "/de_dust2.jpg"
};
export const CS_NUKE_MAP = {
    mapname: "de_nuke",
    name: "Nuke",
    image: "/de_nuke.jpg"
};
export const CS_OVERPASS_MAP = {
    mapname: "de_overpass",
    name: "Overpass",
    image: "/de_overpass.jpg"
};
export const CS_VERTIGO_MAP = {
    mapname: "de_vertigo",
    name: "Vertigo",
    image: "/de_vertigo.jpg"
};
export const CS_TRAIN_MAP = {
    mapname: "de_train",
    name: "Train",
    image: "/de_train.jpg"
};
export const CS_OLD_CBBLE_MAP = {
    mapname: "workshop/855577410/de_cbble",
    name: "Cobblestone",
    image: "/855577410_de_cbble.jpg"
};
export const CS_OLD_CACHE_MAP = {
    mapname: "workshop/951327114/de_cache",
    name: "Cache",
    image: "/951327114_de_cache.jpg"
};
export const CS_ACTIVE_MAP_POOL = [
    CS_ANCIENT_MAP,
    CS_ANUBIS_MAP,
    CS_INFERNO_MAP,
    CS_MIRAGE_MAP,
    CS_NUKE_MAP,
    CS_OVERPASS_MAP,
    CS_VERTIGO_MAP
];
export const CS_ALL_MAPS = [
    CS_ANCIENT_MAP,
    CS_ANUBIS_MAP,
    CS_DUST2_MAP,
    CS_INFERNO_MAP,
    CS_MIRAGE_MAP,
    CS_NUKE_MAP,
    CS_TRAIN_MAP,
    CS_OLD_CACHE_MAP,
    CS_OLD_CBBLE_MAP,
    CS_OVERPASS_MAP,
    CS_VERTIGO_MAP
];
export function CS_getChangeLevelCommand(map) {
    const mapstring = typeof map === "string" ? map : map.mapname;
    const matches = mapstring.match(/workshop\/(\d+)\/[\w_]+/);
    if (matches) {
        return `host_workshop_map ${matches[1]}`;
    }
    return `changelevel ${mapstring}`;
}
