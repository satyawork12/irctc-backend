import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  USER_SERVICE_URL: z.url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid API Gateway environment variables:");
  console.error(parsedEnv.error.issues);
  process.exit(1);
}

export const env = parsedEnv.data;