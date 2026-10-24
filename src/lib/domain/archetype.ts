import type { CapacityId, CapacityScores } from "./capacity";
import type { Choice } from "./choice";
import type { Grant } from "./grant";

export type ArchetypeId = string;
export type Archetype = {
    id: ArchetypeId;
    name: string;

    coreCapacity: CapacityId;
    startingCapacities: Readonly<CapacityScores>;

    choices: readonly Choice[];
    grants: readonly Grant[];
};
