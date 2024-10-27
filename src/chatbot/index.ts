import { Hono } from "hono";
import { grap } from "./graph";
import { HumanMessage } from "@langchain/core/messages";

const app = new Hono();

app.get("/", (c) => c.text("hello from chatbot"));

app.get("/webhook", (c) => {
	const mode = c.req.query("hub.mode");
	const token = c.req.query("hub.verify_token");
	const challenge = c.req.query("hub.challenge");
	const fbToken = process.env.FB_VERIFY_TOKEN;

	if (mode === "subscribe" && token === fbToken) {
		c.status(200);
		return c.text(challenge || "ok");
	} else {
		c.status(403);
		return c.text("Forbidden");
	}
});

app.post("/webhook", async (c) => {
	const fbToken = process.env.FB_TOKEN;

	const body = await c.req.json();
	const message = body.entry?.[0]?.changes[0]?.value?.messages?.[0];

	if (message?.type === "text") {
		const business_phone_number_id =
			body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

		const url = `https://graph.facebook.com/v20.0/${business_phone_number_id}/messages`;

		const headers = new Headers();
		headers.append("Authorization", `Bearer ${fbToken}`);
		headers.append("Content-Type", "application/json");

		const agent = grap;
		const userMessage = message.text.body;
		const threadId = `thread_state_${message.from}`;
		const config = { configurable: { thread_id: threadId } };

		const agentResponse = await agent.invoke(
			{ messages: new HumanMessage(userMessage) },
			config,
		);
		const aiMessage = agentResponse?.messages?.at(-1)?.content;
		const response = await fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify({
				messaging_product: "whatsapp",
				to: message.from,
				text: { body: aiMessage.content },
			}),
		});

		if (response.status !== 200) {
			console.error(response.statusText);
			const message = await response.json();
			console.error(message);
		}
	}

	c.status(200);
	return c.text("ok");
});

export default app;
