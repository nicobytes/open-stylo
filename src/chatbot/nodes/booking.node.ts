import { SystemMessage } from "@langchain/core/messages";

import { MyNodes } from ".";
import { GraphState } from "../graph.state";
import { models } from "../getModel";
import { bookAppointmentTool } from "../tools/bookAppointment.tool";
import { ChatOpenAI } from "@langchain/openai";

const SYSTEM_PROMPT = () => {
	return `You are Expert Assistant for booking an appointment at Sander's, a hairdressing salon in Cochabamba (Bolivia).
To book an appointment, you ask for the date and the name of the client

# RULES
- Recognize previously mentioned information
- Do not assume parameters in calling functions that it does not say.
- MUST NOT force users how to write. Let them write the way they want.
- The conversation should be very natural, like a secretary talking to a client.
- Only call ONE tool at a time.
- Your answers must be in Spanish.`;
};

export const bookingNode = (llm: ChatOpenAI) => {
	return async (state: GraphState) => {
		const { messages } = state;

		const systemPrompt = SYSTEM_PROMPT();
		llm.bindTools([bookAppointmentTool]);

		let trimmedHistory = messages;
		if (trimmedHistory.at(-1)?.getType() === "ai") {
			trimmedHistory = trimmedHistory.slice(0, -1);
		}

		const response = await llm.invoke([
			new SystemMessage(systemPrompt),
			...trimmedHistory.filter((m) => m.getType() !== "system"),
		]);
		return {
			messages: response,
			lastAgent: MyNodes.BOOKING,
			isReadyToBook: true,
		};
	};
};
