import { END, START, StateGraph, Annotation } from "@langchain/langgraph";

const GraphState = Annotation.Root({
  message: Annotation<string>(),
});

type GraphState = typeof GraphState.State;


const node1 = async (state: GraphState) => {
    const currentMessage = state.message;
    return { message: `${currentMessage} I am` };
};

const node2 = async (state: GraphState) => {
    const currentMessage = state.message;
    return { message: `${currentMessage} happy!` };
};

const node3 = async (state: GraphState) => {
    const currentMessage = state.message;
    return { message: `${currentMessage} sad!` };
};

const decideMood = (state: GraphState): string => {
    if (Math.random() < 0.5) {
        return "node3";
      }
      return "node2";
};
  
// Define a new graph
const workflow = new StateGraph(GraphState)
  .addNode("node1", node1)
  .addNode("node2", node2)
  .addNode("node3", node3)
  .addEdge(START, "node1")
  .addConditionalEdges("node1", decideMood)
  .addEdge("node2", END)
  .addEdge("node3", END);

const graph = workflow.compile();

export default graph;