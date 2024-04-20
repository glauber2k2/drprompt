'use client'

import React, { useCallback } from 'react'
import PromptCard from './PromptCard'
import { Input } from '@/components/ui/input'
import { Check, ChevronDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Prompt } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ListPrompts({ prompts }: { prompts: Prompt[] }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const order = searchParams.get('order')
  const filter = searchParams.get('filter')

  const sortedPrompts = prompts
    .filter((prompt) => {
      if (filter) {
        const filterLowerCase = filter.toLowerCase()
        if (filterLowerCase.startsWith('#')) {
          const tag = filterLowerCase.slice(1) // Remove o caractere '#' da tag
          return prompt.tags.some((tagItem) =>
            tagItem.toLowerCase().includes(tag),
          )
        } else {
          const promptTitleLowerCase = prompt.title.toLowerCase()
          return promptTitleLowerCase.includes(filterLowerCase)
        }
      }
      return true
    })
    .sort((a, b) => {
      if (order === 'update') {
        return new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime()
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <div className="mx-auto md:w-2/3 space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <form className="flex items-center gap-2 border border-neutral-300 dark:border-neutral-800 rounded-md px-4 flex-1">
          <Search size={16} />
          <Input
            className="border-none focus-visible:ring-[0] ring-offset-0 min-w-16"
            placeholder="Buscar prompt ou #tag ..."
            onChange={(e) => {
              router.push(
                pathname + '?' + createQueryString('filter', e.target.value),
              )
            }}
          />
        </form>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              Ordenar por <ChevronDown size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Button
              variant={'ghost'}
              size={'sm'}
              className="justify-between gap-2"
              onClick={() => {
                pathname + '?' + createQueryString('order', '')
              }}
            >
              {order == null ? <Check size={16} /> : <div></div>}
              Ordenar por criação
            </Button>
            <Button
              variant={'ghost'}
              size={'sm'}
              className="justify-between gap-2"
              onClick={() => {
                router.push(
                  pathname + '?' + createQueryString('order', 'update'),
                )
              }}
            >
              {order == 'update' ? <Check size={16} /> : <div></div>}
              Data de atualização
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedPrompts.map((prompt) => (
          <PromptCard key={prompt.id} data={prompt} />
        ))}
      </div>
    </div>
  )
}
