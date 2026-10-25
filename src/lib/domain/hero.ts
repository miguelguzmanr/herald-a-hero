import { isRecord, isWholeNumber } from "../validations";
import { isCapacityId, isPerCapacity, type CapacityId, type CapacityScores } from "./capacity";
import { isSize } from "./size";

export type HeroId = string;
export type Hero = {
    id: HeroId;
    name: string;
    player: string;
    rank: number;
    size: number;
    capacities: CapacityScores;
    core?: CapacityId;
    potentialScore: number;
};

export function isHero(value: unknown): value is Hero {
    return (
        isRecord(value) &&
        typeof value.id === "string" &&
        typeof value.name === "string" &&
        typeof value.player === "string" &&
        isWholeNumber(value.rank) &&
        isSize(value.size) &&
        isWholeNumber(value.potentialScore) &&
        isPerCapacity(value.capacities, isWholeNumber) &&
        (value.core === undefined || isCapacityId(value.core))
    );
}
