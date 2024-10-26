import {
	END,
	START,
	StateGraph,
	Annotation,
	MessagesAnnotation,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";

import { getWeather } from "./tools/wheater.tool";
import { getCoolestCities } from "./tools/cities.tool";

import { ChatMistralAI } from "@langchain/mistralai";

const tools = [getWeather, getCoolestCities];

const llm = new ChatMistralAI({
	model: "mistral-large-latest",
	temperature: 0,
	maxRetries: 2,
	apiKey: process.env.MISTRAL_API_KEY,
}).bindTools(tools);

const toolNode = new ToolNode(tools);

const GraphState = Annotation.Root({
	...MessagesAnnotation.spec,
});

type GraphState = typeof GraphState.State;

const shouldContinue = (state: GraphState) => {
	const { messages } = state;
	const lastMessage = messages[messages.length - 1];
	if (
		"tool_calls" in lastMessage &&
		Array.isArray(lastMessage.tool_calls) &&
		lastMessage.tool_calls?.length
	) {
		return "tools";
	}
	return END;
};

const callModel = async (state: GraphState) => {
	const { messages } = state;
	const response = await llm.invoke(messages);
	return { messages: response };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
	.addNode("agent", callModel)
	.addNode("tools", toolNode)
	.addEdge(START, "agent")
	.addConditionalEdges("agent", shouldContinue, ["tools", END])
	.addEdge("tools", "agent");

export const graph = workflow.compile();
