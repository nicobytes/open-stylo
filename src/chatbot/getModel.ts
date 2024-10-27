import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai";

export const models = {
	gpt4: (apiKey: string) => {
		return new ChatOpenAI({
			model: "gpt-4",
			temperature: 0,
			maxRetries: 2,
			apiKey,
		});
	},
	mistral: (apiKey: string) => {
		return new ChatMistralAI({
			model: "mistral-large-latest",
			temperature: 0,
			maxRetries: 2,
			apiKey,
		});
	},
};
