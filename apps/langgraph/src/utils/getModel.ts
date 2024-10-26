import { ChatMistralAI } from "@langchain/mistralai";

export function getLLM() {
	return new ChatMistralAI({
		model: "mistral-large-latest",
		temperature: 0,
		maxRetries: 2,
		apiKey: process.env.MISTRAL_API_KEY,
	});
}
