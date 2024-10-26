import { Hono } from 'hono';
import type { App } from "@src/types";

const app = new Hono<App>();

app.get('/', (c) => c.text('hello from chatbot'));
app.get('/webhook', (c) => c.json('list webhook'));
app.post('/webhook', (c) => c.json('proxy', 201));

export default app;