import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const bookAppointmentTool = tool(
	async (input) => {
		const { date, customerName } = input;
		return `Appointment was scheduled for ${customerName} on ${date} 😋`;
	},
	{
		name: "book_appointment",
		description:
			"Book an appointment for a date and time, and include the client's name",
		schema: z.object({
			date: z.string().datetime().describe("booking date"),
			customerName: z.string().describe("client name"),
		}),
	},
);
