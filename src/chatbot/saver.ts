import { MemorySaver } from "@langchain/langgraph";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

export function getSaver() {
	const env = process.env.NODE_ENV || "development";
	const databaseUrl = process.env.DATABASE_URL || "";

	if (env === "production" && databaseUrl) {
		return PostgresSaver.fromConnString(databaseUrl);
	}

	return new MemorySaver();
}
