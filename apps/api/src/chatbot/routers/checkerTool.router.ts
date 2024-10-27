import { END } from "@langchain/langgraph";
import { GraphState } from "../graph.state";
import { MyNodes } from "../nodes";

export const checkerToolRouter = (state: GraphState) => {
	const { messages } = state;
	const lastMessage = messages.at(-1);
	if (
		lastMessage &&
		"tool_calls" in lastMessage &&
		Array.isArray(lastMessage.tool_calls) &&
		lastMessage.tool_calls?.length
	) {
		return MyNodes.TOOLS;
	}
	return END;
};
