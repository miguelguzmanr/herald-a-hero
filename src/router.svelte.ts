import type { HeroId } from "./lib/domain/hero";
import { isScene, type Scene } from "./lib/domain/scene";

export type Route =
    | { name: "home" }
    | { name: "hero"; heroId: HeroId }
    | { name: "edit"; heroId: HeroId }
    | { name: "scene"; heroId: HeroId; scene: Scene };

/** Parse "#/hero/<heroId>/<page>" */
function parse(hash: string): Route {
    const [first, heroId, page] = hash.replace(/^#\/?/, "").split("/");

    if (first !== "hero" || !heroId) return { name: "home" };
    if (!page) return { name: "hero", heroId };
    if (page === "edit") return { name: "edit", heroId };
    if (isScene(page)) return { name: "scene", heroId, scene: page };

    return { name: "home" };
}

export function href(route: Route): string {
    switch (route.name) {
        case "home":
            return "#/";
        case "hero":
            return `#/hero/${route.heroId}`;
        case "edit":
            return `#/hero/${route.heroId}/edit`;
        case "scene":
            return `#/hero/${route.heroId}/${route.scene}`;
    }
}

class Router {
    route = $state<Route>(parse(location.hash));

    constructor() {
        window.addEventListener("hashchange", () => (this.route = parse(location.hash)));
    }

    go(route: Route): void {
        location.hash = href(route);
    }

    replace(route: Route): void {
        location.replace(href(route));
    }
}

export const router = new Router();
