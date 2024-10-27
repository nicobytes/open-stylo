import { END, START, StateGraph } from "@langchain/langgraph";
import { D1Saver } from "./saver";

import { GraphState } from "./graph.state";

import { MyNodes } from "./nodes";
import { toolNode } from "./nodes/tool.node";
import { availabilityNode } from "./nodes/availability.node";
import { bookingNode } from "./nodes/booking.node";
import { conversationalNode } from "./nodes/conversation.node";

import { checkerToolRouter } from "./routers/checkerTool.router";
import { availabilityRouter } from "./routers/availability.router";
import { toolToNodeRouter } from "./routers/toolToNode.router";
import { intentRouter } from "./routers/intent.router";
import { models } from "./getModel";

interface Props {
	openAIKey: string;
	mistralKey: string;
}

export const createGraph = (data: Props, db: D1Database) => {
	const memory = new D1Saver(db);

	const llmGpt4 = models.gpt4(data.openAIKey);
	const llmMistral = models.mistral(data.mistralKey);

	const workflow = new StateGraph(GraphState)
		// nodes
		.addNode(MyNodes.TOOLS, toolNode)
		.addNode(MyNodes.AVAILABILITY, availabilityNode(llmGpt4))
		.addNode(MyNodes.BOOKING, bookingNode(llmGpt4))
		.addNode(MyNodes.CONVERSATION, conversationalNode(llmMistral))
		// edges
		.addEdge(MyNodes.CONVERSATION, END)
		.addEdge(MyNodes.BOOKING, END)
		// routers
		.addConditionalEdges(MyNodes.TOOLS, toolToNodeRouter, [
			MyNodes.AVAILABILITY,
			MyNodes.BOOKING,
			END,
		])
		.addConditionalEdges(MyNodes.AVAILABILITY, availabilityRouter(llmMistral), [
			MyNodes.TOOLS,
			MyNodes.BOOKING,
			END,
		])
		.addConditionalEdges(MyNodes.BOOKING, checkerToolRouter, [
			MyNodes.TOOLS,
			END,
		])
		.addConditionalEdges(START, intentRouter(llmMistral), [
			MyNodes.AVAILABILITY,
			MyNodes.BOOKING,
			MyNodes.CONVERSATION,
		]);

	return workflow.compile({ checkpointer: memory });
};
