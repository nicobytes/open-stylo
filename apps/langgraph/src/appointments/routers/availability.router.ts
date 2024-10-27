import { END } from "@langchain/langgraph";
import { GraphState } from "../graph.state";
import { MyNodes } from "../nodes";
import { models } from "../getModel";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const SYSTEM_TEMPLATE = `You are a customer support to determine information to book and appointment expert.
Your job is to determine if a customer is ready to book and appointment when the user give date and time to book.`;

const HUMAN_TEMPLATE = `The previous conversation is an interaction between a customer service representative and a user.
Retrieve whether there is a date and time to book an appointment in the conversation,
Respond with a JSON object containing a single key called "isReadyToBook" with one of the following values: true if the appropriate values exist to book, otherwise false.`;

export const availabilityRouter = async (state: GraphState) => {
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

	const llm = models.mistral();
	const response = await llm.invoke(
		[
			new SystemMessage(SYSTEM_TEMPLATE),
			...state.messages,
			new HumanMessage(HUMAN_TEMPLATE),
		],
		{
			response_format: {
				type: "json_object",
			},
		},
	);
	const output = JSON.parse(response.content as string);
	const isReadyToBook = output.isReadyToBook;

	if (isReadyToBook) {
		return MyNodes.BOOKING;
	}

	return END;
};
