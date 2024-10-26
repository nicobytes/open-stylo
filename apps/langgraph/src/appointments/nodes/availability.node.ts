import { formatDate } from "date-fns";
import { checkAvailabilityTool } from "../tools/checkAvailability.tool";

import { getLLM } from "../../utils/getModel";
import { GraphState } from "../graph.state";
import { SystemMessage } from "@langchain/core/messages";
import { MyNodes } from ".";

const SYSTEM_PROMPT = (formattedDate: string) => {
	return `You are expert assistant to check the availability and book appointments for Sander's, a hair salon in Cochabamba (Bolivia).

# GOAL
-  To help customers check availability for appointments, ask for the date and time they would like to book an appointment.

# RULES
- As reference, today is ${formattedDate}.
- Don't assume parameters in call functions that it didnt say.
- MUST NOT force users how to write. Let them write in the way they want.
- The conversation should be very natural like a secretary talking with a client.
- Call only ONE tool at a time.
- Your responses must be in spanish.
- Keep a friendly, professional tone.
- Avoid verbosity.`;
};

export const availabilityNode = async (state: GraphState) => {
	const { messages } = state;

	const today = new Date();
	const formattedDate = formatDate(today, "yyyy-MM-dd HH:mm");
	const systemPrompt = SYSTEM_PROMPT(formattedDate);
	const llm = getLLM().bindTools([checkAvailabilityTool]);

	let trimmedHistory = messages;
	if (trimmedHistory.at(-1)?.getType() === "ai") {
		trimmedHistory = trimmedHistory.slice(0, -1);
	}

	const response = await llm.invoke([
		new SystemMessage(systemPrompt),
		...trimmedHistory.filter((m) => m.getType() !== "system"),
	]);
	return { messages: response, lastAgent: MyNodes.BOOKING };
};
