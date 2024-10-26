import { END } from "@langchain/langgraph";
import { GraphState } from "../graph.state";

export const shouldContinueNode = (state: GraphState) => {
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