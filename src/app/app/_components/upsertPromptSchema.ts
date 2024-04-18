import { z } from 'zod'

export const upsetPromptSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  title: z.string(),
})
