import { z } from 'zod'

export const upsertPromptSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  title: z.string(),
})
