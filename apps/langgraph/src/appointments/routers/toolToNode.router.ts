import { END } from "@langchain/langgraph";
import { GraphState } from "../graph.state";

export const toolToNodeRouter = (state: GraphState) => {
	const { lastAgent } = state;
	if (lastAgent) {
		return lastAgent;
	}
	return END;
};
