import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  PORT: z.coerce.number().default(3000),
});

export type Env = z.infer<typeof envSchema>;
