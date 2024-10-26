import { ChatOpenAI } from "@langchain/openai";
import { ChatMistralAI } from "@langchain/mistralai";

type models = "openai" | "mistral";

const llms = {
	openai: () =>
		new ChatOpenAI({
			model: "gpt-4",
			temperature: 0,
			maxRetries: 2,
			apiKey: process.env.OPENAI_API_KEY,
		}),
	mistral: () =>
		new ChatMistralAI({
			model: "mistral-large-latest",
			temperature: 0,
			maxRetries: 2,
			apiKey: process.env.MISTRAL_API_KEY,
		}),
};

export function getLLM(model: models) {
	return llms[model]() || llms.openai();
}
