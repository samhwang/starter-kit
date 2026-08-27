import * as z from 'zod';

export const UserRole = z.enum(['admin', 'user']);
export type UserRole = z.infer<typeof UserRole>;
