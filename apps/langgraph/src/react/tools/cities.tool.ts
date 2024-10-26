import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const getCoolestCities = tool(
	() => {
		return "nyc, sf";
	},
	{
		name: "get_coolest_cities",
		description: "Get a list of coolest cities",
		schema: z.object({
			noOp: z.string().optional().describe("No-op parameter."),
		}),
	},
);
