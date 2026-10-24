import type { Archetype } from "../domain/archetype";
import type { CapacityScores } from "../domain/capacity";
import type { Grant } from "../domain/grant";
import type { Hero } from "../domain/hero";

export function collectGrants(hero: Hero, archetype: Archetype): Grant[] {
    const choices = archetype.choices.flatMap((choice) =>
        (hero.choices[choice.id] ?? []).flatMap(
            (optionId) => choice.options.find((o) => o.id === optionId)?.grants ?? [],
        ),
    );

    return [...archetype.grants, ...choices];
}

export function calculateCapacities(archetype: Archetype, grants: Grant[]): CapacityScores {
    const scores = { ...archetype.startingCapacities };
    for (const g of grants)
        if (g.type === "capacityScore") scores[g.capacity] = scores[g.capacity] + g.amount;

    return scores;
}
