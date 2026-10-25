import "@fontsource-variable/petrona";
import "@fontsource/cinzel-decorative/400.css";
import "@fontsource/cinzel-decorative/700.css";
import "@fontsource/cinzel-decorative/900.css";
import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";

const app = mount(App, {
    target: document.body,
});

export default app;
