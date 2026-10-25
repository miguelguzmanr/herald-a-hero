import "@fontsource-variable/petrona";
import "@fontsource/cinzel-decorative";
import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";

const app = mount(App, {
    target: document.body,
});

export default app;
