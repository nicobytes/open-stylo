export type Bindings = {
	DB_STORE: D1Database;
	JWT_SECRET: string;
	CLOUDFLARE_ACCOUNT_ID: string;
	CLOUDFLARE_API_TOKEN: string;
	CLOUDFLARE_AI_GATEWAY_URL: string;
	OPENAI_API_KEY: string;
	AI: any;
	BUCKET: R2Bucket;
	R2_URL: string;
};
