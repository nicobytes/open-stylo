import {
	END,
	START,
	StateGraph
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";

import { GraphState } from "./graph.state";
import { agentNode, tools } from "./nodes/agent.node";
import { shouldContinueNode } from "./nodes/shouldContinue.node";

const toolNode = new ToolNode(tools);
const memory = new MemorySaver();

// Define a new graph
const workflow = new StateGraph(GraphState)
	.addNode("agent", agentNode)
	.addNode("tools", toolNode)
	.addEdge(START, "agent")
	.addConditionalEdges("agent", shouldContinueNode, ["tools", END])
	.addEdge("tools", "agent");

export const graph = workflow.compile({ checkpointer: memory });