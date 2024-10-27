import { formatDate } from "date-fns";
import { checkAvailabilityTool } from "../tools/checkAvailability.tool";

import { GraphState } from "../graph.state";
import { SystemMessage } from "@langchain/core/messages";
import { MyNodes } from ".";
import { ChatOpenAI } from "@langchain/openai";

const SYSTEM_PROMPT = (formattedDate: string) => {
	return `You are expert assistant for checking the availability of Sander's, a hairdressing salon in Cochabamba (Bolivia). To help customers check availability for appointments, you ask them for the date they would like to book an appointment.

# RULES
- As reference, today is ${formattedDate}.
- Don't assume parameters in call functions that it didnt say.
- MUST NOT force users how to write. Let them write in the way they want.
- The conversation should be very natural like a secretary talking with a client.
- Call only ONE tool at a time.
- Your responses must be in spanish.`;
};

export const availabilityNode = (llm: ChatOpenAI) => {
	return async (state: GraphState) => {
		const { messages } = state;

		const formattedDate = formatDate(new Date(), "yyyy-MM-dd");
		const systemPrompt = SYSTEM_PROMPT(formattedDate);
		llm.bindTools([checkAvailabilityTool]);

		let trimmedHistory = messages;
		if (trimmedHistory.at(-1)?.getType() === "ai") {
			trimmedHistory = trimmedHistory.slice(0, -1);
		}

		const response = await llm.invoke([
			new SystemMessage(systemPrompt),
			...trimmedHistory.filter((m) => m.getType() !== "system"),
		]);
		return { messages: response, lastAgent: MyNodes.AVAILABILITY };
	};
};
