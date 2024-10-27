import { ToolNode } from "@langchain/langgraph/prebuilt";

import { checkAvailabilityTool } from "../tools/checkAvailability.tool";
import { bookAppointmentTool } from "../tools/bookAppointment.tool";

export const toolNode = new ToolNode([
	checkAvailabilityTool,
	bookAppointmentTool,
]);
