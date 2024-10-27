import { ChatMistralAI } from "@langchain/mistralai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import dotenv from "dotenv";
import { formatDate } from "date-fns";

dotenv.config();

console.log(process.env.MISTRAL_API_KEY);

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

(async () => {
	const checkAvailabilityTool = tool(
        async (input) => {
            const { desiredDate } = input;
    
            return `This availability for ${desiredDate} is as follows:
                Available slots: 9am, 10am, 11am, 12pm, 1pm, 2pm, 3pm, 4pm, 5pm`;
        },
        {
            name: "check_availability",
            description: "Check availability for a desired date",
            schema: z.object({
                desiredDate: z.string().date().describe("desired date"),
            }),
        },
    );

	// Bind the tool to the model
	const modelWithTool = new ChatMistralAI({
		model: "mistral-large-latest",
		temperature: 0,
		apiKey: process.env.MISTRAL_API_KEY,
	}).bindTools([checkAvailabilityTool]);

    const today = new Date();
	const formattedDate = formatDate(today, "yyyy-MM-dd");
	const systemPrompt = SYSTEM_PROMPT(formattedDate);

    console.log(systemPrompt);

	const calcToolPrompt = ChatPromptTemplate.fromMessages([
		[
			"system",
			systemPrompt
		],
		["human", "{input}"],
	]);

	const chainWithCalcTool = calcToolPrompt.pipe(modelWithTool);

	const calcToolRes = await chainWithCalcTool.invoke({
		input: "quiero una cita para el siguiente martes",
	});
	console.log(calcToolRes);
})();
