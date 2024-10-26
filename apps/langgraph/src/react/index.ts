import {
	END,
	START,
	StateGraph,
	Annotation,
	MessagesAnnotation,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";

import { getWeather } from "./tools/wheater.tool";
import { getCoolestCities } from "./tools/cities.tool";

import { getLLM } from "./../utils/getModel";

const tools = [getWeather, getCoolestCities];

const llm = getLLM().bindTools(tools);

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

const memory = new MemorySaver();

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
	.addNode("agent", callModel)
	.addNode("tools", toolNode)
	.addEdge(START, "agent")
	.addConditionalEdges("agent", shouldContinue, ["tools", END])
	.addEdge("tools", "agent");

export const graph = workflow.compile({ checkpointer: memory });
