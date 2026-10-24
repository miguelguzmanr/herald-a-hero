import type { Choice } from "./choice";
import type { Grant } from "./grant";

export type AncestryId = string;
export type Ancestry = {
    id: AncestryId;
    name: string;

    choices: readonly Choice[];
    grants: readonly Grant[];
};
