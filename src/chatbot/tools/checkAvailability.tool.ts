import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const checkAvailabilityTool = tool(
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
