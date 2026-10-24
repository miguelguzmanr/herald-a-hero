import type { TerrainId } from "../domain/terrain";

export const terrainNames = {
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
