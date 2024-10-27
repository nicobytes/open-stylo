import { Hono } from "hono";
import type { App } from "@src/types";

const app = new Hono<App>();

app.get("/", (c) => c.text("hello from chatbot"));

app.get("/webhook", (c) => {
	const mode = c.req.query("hub.mode");
	const token = c.req.query("hub.verify_token");
	const challenge = c.req.query("hub.challenge");
	if (mode === "subscribe" && token === c.env.FB_VERIFY_TOKEN) {
		c.status(200);
		return c.text(challenge || "ok");
	} else {
		c.status(403);
		return c.text("Forbidden");
	}
});

app.post("/webhook", async (c) => {
	const body = await c.req.json();
	const message = body.entry?.[0]?.changes[0]?.value?.messages?.[0];

	if (message?.type === "text") {
		const business_phone_number_id =
			body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

		const url = `https://graph.facebook.com/v20.0/${business_phone_number_id}/messages`;

		const headers = new Headers();
		headers.append("Authorization", `Bearer ${c.env.FB_TOKEN}`);
		headers.append("Content-Type", "application/json");

		const response = await fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify({
				messaging_product: "whatsapp",
				to: message.from,
				text: { body: "Echo: " + message.text.body },
			}),
		});

        if (response.status !== 200) {
            console.error(response.statusText);
        }
	}

	c.status(200);
});

export default app;
