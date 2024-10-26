import { Annotation, MessagesAnnotation } from "@langchain/langgraph";
import { MyNodes } from "./nodes";

export const GraphState = Annotation.Root({
	...MessagesAnnotation.spec,
	lastAgent: Annotation<MyNodes>,
});

export type GraphState = typeof GraphState.State;
