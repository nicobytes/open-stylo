import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai";

export const models = {
	gpt4: () => {
		return new ChatOpenAI({
			model: "gpt-4",
			temperature: 0,
			maxRetries: 2,
			apiKey: process.env.OPENAI_API_KEY,
		});
	},
	mistral: () => {
		return new ChatMistralAI({
			model: "mistral-large-latest",
			temperature: 0,
			maxRetries: 2,
			apiKey: process.env.MISTRAL_API_KEY,
		});
	},
};
