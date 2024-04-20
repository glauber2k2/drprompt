import { upsertPromptSchema } from './upsertPromptSchema'
import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { z } from 'zod'

export async function getAllPrompts() {
  const prompts = await prisma.prompt.findMany()
  return prompts
}

export async function getUserPrompts() {
  const session = await auth()
  const prompts = await prisma.prompt.findMany({
    where: {
      userId: session?.user?.id,
    },
  })
  return prompts
}

export async function upsertPrompt(input: z.infer<typeof upsertPromptSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado.',
      data: null,
    }
  }

  if (input.id) {
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    })

    if (!prompt) {
      return {
        error: 'Não encontrado.',
        data: null,
      }
    }

    const updatedPrompt = await prisma.prompt.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        title: input.title,
        text: input.text,
        tags: input.tags,
      },
    })

    return {
      error: null,
      data: updatedPrompt,
    }
  }

  if (!input.title) {
    return {
      error: 'Titulo obrigatorio.',
      data: null,
    }
  }

  const prompt = await prisma.prompt.create({
    data: {
      title: input.title,
      text: input.text,
      tags: input.tags,
      userId: session?.user?.id,
    },
  })

  return prompt
}

export async function deletePrompt(promptId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado.',
      data: null,
    }
  }

  const prompt = await prisma.prompt.findUnique({
    where: {
      id: promptId,
    },
    select: {
      userId: true,
    },
  })

  if (!prompt) {
    return {
      error: 'Prompt não encontrado.',
      data: null,
    }
  }

  if (prompt.userId !== session.user.id) {
    return {
      error: 'Você não tem permissão para excluir este prompt.',
      data: null,
    }
  }

  await prisma.prompt.delete({
    where: {
      id: promptId,
    },
  })

  return {
    error: null,
    data: 'Prompt excluído com sucesso.',
  }
}
