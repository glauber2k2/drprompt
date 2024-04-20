'use server'

import { deletePrompt, upsertPrompt } from '@/app/app/_components/actions'
import { upsertPromptSchema } from '@/app/app/_components/upsertPromptSchema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function addOrUpdatePrompt(
  values: z.infer<typeof upsertPromptSchema>,
) {
  await upsertPrompt(values)
  revalidatePath('/app/my-prompts')
}

export async function deletePromptAction(id: string) {
  await deletePrompt(id)
  revalidatePath('/app/my-prompts')
}
