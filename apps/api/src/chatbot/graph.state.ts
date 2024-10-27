import { Annotation, MessagesAnnotation } from "@langchain/langgraph";
import { MyNodes } from "./nodes";

export const GraphState = Annotation.Root({
	...MessagesAnnotation.spec,
	lastAgent: Annotation<MyNodes>,
	isReadyToBook: Annotation<boolean>,
});

export type GraphState = typeof GraphState.State;
