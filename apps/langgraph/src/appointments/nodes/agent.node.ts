import { formatDate } from "date-fns";

import { checkAvailability } from "../tools/checkAvailability.tool";
import { bookAppointment } from "../tools/bookAppointment.tool";

import { getLLM } from "./../../utils/getModel";
import { GraphState } from "../graph.state";

const SYSTEM_PROMPT = (formattedDate: string) => {
	return `Your name is SanderBot and you are helpful assistant in Sander's a hair salon in Cochabamba (Bolivia).
As reference, today is ${formattedDate}.
Keep a friendly, professional tone.
Avoid verbosity.

Considerations:
- Don't assume parameters in call functions that it didnt say.
- MUST NOT force users how to write. Let them write in the way they want.
- The conversation should be very natural like a secretary talking with a client.
- Call only ONE tool at a time.
- Your responses must be in spanish.`;
};

export const tools = [checkAvailability, bookAppointment];

const llm = getLLM("openai").bindTools(tools);


export const agentNode = async (state: GraphState) => {
	const { messages } = state;

	const today = new Date();
	const formattedDate = formatDate(today, "yyyy-MM-dd HH:mm");
	const systemPrompt = SYSTEM_PROMPT(formattedDate);

	const response = await llm.invoke([
		{ role: "system", content: systemPrompt },
		...messages,
	]);
	return { messages: response };
};

