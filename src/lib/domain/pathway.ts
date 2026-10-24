import type { Choice } from "./choice";
import type { Grant } from "./grant";

export type PathwayId = string;
export type Pathway = {
    id: PathwayId;
    name: string;

    choices: readonly Choice[];
    grants: readonly Grant[];
};
