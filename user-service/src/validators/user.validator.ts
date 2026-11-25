import {z} from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(72),
    firstName: z.string().trim().min(1).max(50),
    lastName: z.string().trim().min(1).max(50).optional(),
    phoneNumber: z.string().optional(),

});

export type CreateUserInput = z.infer<typeof createUserSchema>;