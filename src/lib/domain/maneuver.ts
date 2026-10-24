import type { CapacityId } from "./capacity";

export type ManeuverId = string;
export type Maneuver = {
    id: ManeuverId;
    name: string;

    capacity: CapacityId;
    cost: number;
};
