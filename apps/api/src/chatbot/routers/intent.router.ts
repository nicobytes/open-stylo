import { GraphState } from "../graph.state";
import { models } from "../getModel";
import { MyNodes } from "../nodes";
import { ChatMistralAI } from "@langchain/mistralai";

const CATEGORIZATION_SYSTEM_TEMPLATE = `You are a customer support routing expert.
Your job is to determine if a customer support representative is routing a user to the:

- Booking or Scheduling Team
- Rescheduling team
- Cancellation team

if the user's request is not related to the previous team and is just a conversational response.`;

const CATEGORIZATION_HUMAN_TEMPLATE = `The previous conversation is an interaction between a customer support representative and a user.
Extract whether the representative is routing the user to a support team, or whether they are just responding conversationally.
Respond with a JSON object containing a single key called "nextRepresentative" with one of the following values:

If they want to route the user to the Booking or Appointment team, respond only with the word "Booking".
If they want to route the user to the Rescheduling team, respond only with the word "Rescheduling".
If they want to route the user to the Canceling team, respond only with the word "Canceling".
Otherwise, respond only with the word "Conversation".`;

export const intentRouter = (llm: ChatMistralAI) => {
	return async (state: GraphState) => {
		const { lastAgent } = state;
		// TODO:
		const isReadyToBook = false;

		if (lastAgent === MyNodes.AVAILABILITY || lastAgent === MyNodes.BOOKING) {
			return lastAgent;
		}

		const categorizationResponse = await llm.invoke(
			[
				{
					role: "system",
					content: CATEGORIZATION_SYSTEM_TEMPLATE,
				},
				...state.messages,
				{
					role: "user",
					content: CATEGORIZATION_HUMAN_TEMPLATE,
				},
			],
			{
				response_format: {
					type: "json_object",
				},
			},
		);
		const categorizationOutput = JSON.parse(
			categorizationResponse.content as string,
		);

		const intent = categorizationOutput.nextRepresentative;
		if (intent.includes("Booking") && isReadyToBook) {
			return MyNodes.BOOKING;
		} else if (intent.includes("Booking") && !isReadyToBook) {
			return MyNodes.AVAILABILITY;
		}
		return MyNodes.CONVERSATION;
	};
};
