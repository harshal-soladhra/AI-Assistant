import { z } from 'zod';

export const contactSchema = z.object({
    username: z.string({required_error: "Username is required"}).min(3, 'Username must be at least 3 characters long').trim().max(30, 'Username must be at most 30 characters long'),
    email: z.string({required_error: "Email is required"}).email('Invalid email address'),
    message: z.string({required_error: "Message is required"}).min(10, 'Message must be at least 10 characters long').max(500, 'Message must be at most 500 characters long'),
});