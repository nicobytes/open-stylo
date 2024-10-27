import { END, START, StateGraph } from "@langchain/langgraph";

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
import { getSaver } from "./saver";


const checkpointer = getSaver();

const workflow = new StateGraph(GraphState)
	// nodes
	.addNode(MyNodes.TOOLS, toolNode)
	.addNode(MyNodes.AVAILABILITY, availabilityNode)
	.addNode(MyNodes.BOOKING, bookingNode)
	.addNode(MyNodes.CONVERSATION, conversationalNode)
	// edges
	.addEdge(MyNodes.CONVERSATION, END)
	.addEdge(MyNodes.BOOKING, END)
	// routers
	.addConditionalEdges(MyNodes.TOOLS, toolToNodeRouter, [
		MyNodes.AVAILABILITY,
		MyNodes.BOOKING,
		END,
	])
	.addConditionalEdges(MyNodes.AVAILABILITY, availabilityRouter, [
		MyNodes.TOOLS,
		MyNodes.BOOKING,
		END,
	])
	.addConditionalEdges(MyNodes.BOOKING, checkerToolRouter, [MyNodes.TOOLS, END])
	.addConditionalEdges(START, intentRouter, [
		MyNodes.AVAILABILITY,
		MyNodes.BOOKING,
		MyNodes.CONVERSATION,
	]);

export const graph = workflow.compile({ checkpointer });
