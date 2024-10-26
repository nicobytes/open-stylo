import { Hono } from 'hono';
import type { App } from "@src/types";

const app = new Hono<App>();

app.get('/', (c) => c.text('hello from API'))

export default app;