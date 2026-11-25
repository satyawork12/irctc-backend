import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT : z.coerce.number().int().positive().default(3000),
    NODE_ENV : z.enum(["development", "production", "test"]).default("development"),
    DATABASE_URL : z.string().min(1, "DATABASE_URL is required"),
    REDIS_URL : z.string().min(1, "REDIS_URL is required"),                 
})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Invalid environment variables:");
    console.error(parsedEnv.error.issues)
    process.exit(1);
}

export const env = parsedEnv.data;