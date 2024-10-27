import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("hello from API"));

export default app;
