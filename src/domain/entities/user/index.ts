import { z } from "zod";

export const zUser = z.object({
  uid: z.number(),
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
});

export type User = z.infer<typeof zUser>;
