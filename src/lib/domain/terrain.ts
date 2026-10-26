/* Rules order */
export const TERRAIN_IDS = [
    "desert",
    "grasslandsTemperate",
    "grasslandsSavannah",
    "forestBoreal",
    "forestTemperate",
    "forestTropical",
    "marine",
    "mountains",
    "tundra",
    "wetlands",
] as const;

export type TerrainId = (typeof TERRAIN_IDS)[number];

export const TERRAIN_NAMES = {
    desert: "Desert",
    grasslandsTemperate: "Grasslands (Temperate)",
    grasslandsSavannah: "Grasslands (Savannah)",
    forestBoreal: "Forest, Boreal",
    forestTemperate: "Forest, Temperate",
    forestTropical: "Forest, Tropical",
    marine: "Marine",
    mountains: "Mountains",
    tundra: "Tundra",
    wetlands: "Wetlands",
} satisfies Record<TerrainId, string>;
