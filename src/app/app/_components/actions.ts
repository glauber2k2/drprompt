import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function getUserPrompts() {
  const session = await auth()
  const prompts = await prisma.prompt.findMany({
    where: {
      userId: session?.user?.id,
    },
  })
  return prompts
}
