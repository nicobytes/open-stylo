import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai";

export const models = {
	gpt4: (apiKey: string) => {
		return new ChatOpenAI({
			model: "gpt-4",
			temperature: 0,
			maxRetries: 2,
			apiKey,
			configuration: {
				baseURL:
					"https://gateway.ai.cloudflare.com/v1/b2bb1719bede14df8732870a3974b263/gateway/openai",
			},
		});
	},
	mistral: (apiKey: string) => {
		return new ChatMistralAI({
			model: "mistral-large-latest",
			temperature: 0,
			maxRetries: 2,
			apiKey,
			endpoint:
				"https://gateway.ai.cloudflare.com/v1/b2bb1719bede14df8732870a3974b263/gateway/mistral",
		});
	},
};
