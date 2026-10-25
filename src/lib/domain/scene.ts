export const SCENE_IDS = ["battle", "journey", "montage", "respite", "skirmish"] as const;

export type Scene = (typeof SCENE_IDS)[number];

export function isScene(value: string): value is Scene {
    return (SCENE_IDS as readonly string[]).includes(value);
}
