import { END, START, StateGraph } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";

import { GraphState } from "./graph.state";

import { MyNodes } from "./nodes";
import { toolNode } from "./nodes/tool.node";
import { availabilityNode } from "./nodes/availability.node";
import { conversationalNode } from "./nodes/conversation.node";

import { toolRouter } from "./routers/tool.router";
import { intentRouter } from "./routers/intent.router";

const memory = new MemorySaver();

const workflow = new StateGraph(GraphState)
	.addNode(MyNodes.BOOKING, availabilityNode)
	.addNode(MyNodes.CONVERSATION, conversationalNode)
	.addNode(MyNodes.TOOLS, toolNode)
	.addConditionalEdges(START, intentRouter, [
		MyNodes.BOOKING,
		MyNodes.CONVERSATION,
	])
	.addConditionalEdges(MyNodes.BOOKING, toolRouter, [MyNodes.TOOLS, END])
	.addEdge(MyNodes.TOOLS, MyNodes.BOOKING)
	.addEdge(MyNodes.CONVERSATION, END);

export const graph = workflow.compile({ checkpointer: memory });
