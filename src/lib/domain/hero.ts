import type { AncestryId } from "./ancestry";
import type { ArchetypeId } from "./archetype";
import type { ChoiceId, ChoiceOptionId } from "./choice";

export type HeroId = string;
export type Hero = {
    id: HeroId;
    name: string;
    player: string;
    rank: number;

    ancestry?: AncestryId;
    archetype?: ArchetypeId;
    // pathways
    // community
    // upbringing

    choices: Record<ChoiceId, ChoiceOptionId[]>;
};
