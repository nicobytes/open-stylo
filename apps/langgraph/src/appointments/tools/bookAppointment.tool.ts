import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const bookAppointment = tool(
	async (input) => {
		const { date, customerName } = input;
		return `Appointment was scheduled for ${customerName} on ${date}`;
	},
	{
		name: "book_appointment",
		description: "Book an appointment for a date, and include the customer's name",
		schema: z.object({
			date: z.string().describe("booking date"),
			customerName: z.string().describe("customer name"),
		}),
	},
);
