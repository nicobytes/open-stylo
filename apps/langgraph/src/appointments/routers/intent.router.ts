import { GraphState } from "../graph.state";
import { getLLM } from "../../utils/getModel";
import { MyNodes } from "../nodes";

const CATEGORIZATION_SYSTEM_TEMPLATE = `You are an expert customer support routing system.
Your job is to detect whether a customer support representative is routing a user to:

- Availability team
- Booking team
- Rescheduling team
- Canceling team

if the user request is not about related just responding conversationally.`;
const CATEGORIZATION_HUMAN_TEMPLATE = `The previous conversation is an interaction between a customer support representative and a user.
Extract whether the representative is routing the user to a billing or technical team, or whether they are just responding conversationally.
Respond with a JSON object containing a single key called "nextRepresentative" with one of the following values:

If they want to route the user to the Availability tema, respond only with the word "Availability".
If they want to route the user to the Booking team, respond only with the word "Booking".
If they want to route the user to the Rescheduling team, respond only with the word "Rescheduling".
If they want to route the user to the Canceling team, respond only with the word "Canceling".
Otherwise, respond only with the word "RESPOND".`;

export const intentRouter = async (state: GraphState) => {
	const { lastAgent } = state;

	if (lastAgent) {
		return lastAgent;
	}

	const llm = getLLM();
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
	if (intent.includes("Booking")) {
		return MyNodes.BOOKING;
	}
	return MyNodes.CONVERSATION;
};
