export type Bindings = {
	JWT_SECRET: string;
	CLOUDFLARE_ACCOUNT_ID: string;
	CLOUDFLARE_API_TOKEN: string;
	CLOUDFLARE_AI_GATEWAY_URL: string;
	OPENAI_API_KEY: string;
	MISTRAL_API_KEY: string;
	AI: any;
	BUCKET: R2Bucket;
	R2_URL: string;
	FB_TOKEN: string;
	FB_VERIFY_TOKEN: string;
	HISTORY_KV: KVNamespace;
	HISTORY_DB: D1Database;
};
