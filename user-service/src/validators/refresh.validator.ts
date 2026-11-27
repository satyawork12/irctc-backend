import {z} from "zod";

export const refreshSchema = z.object({
    sessionId: z.string().uuid(),
    refreshToken: z.string().min(1),
});

export type refreshInput = z.infer<typeof refreshSchema>;