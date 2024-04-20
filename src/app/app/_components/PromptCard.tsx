'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, Terminal } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Prompt } from '@prisma/client'
import React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'

export default function PromptCard({ data }: { data: Prompt }) {
  const { toast } = useToast()

  const isPostedToday =
    new Date(data.createdAt).getDate() === new Date().getDate() &&
    new Date(data.createdAt).getMonth() === new Date().getMonth() &&
    new Date(data.createdAt).getFullYear() === new Date().getFullYear()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.text)
      toast({
        title: 'Prompt copiado!',
      })
    } catch (err) {
      toast({ title: 'Falha ao copiar.', variant: 'destructive' })
    }
  }

  const formatedText =
    data.text.length > 150 ? data.text.slice(0, 150) + '...' : data.text

  return (
    <div className="border border-neutral-300 dark:border-neutral-800 min-h-48 rounded-lg p-6 flex flex-col gap-2">
      <div className="flex items-center">
        <div className="flex gap-2 items-start mr-auto">
          <Terminal className="shrink-0 mt-1" />
          <span>
            <h1 className="text-sm font-medium flex items-center gap-2 flex-wrap">
              {isPostedToday && (
                <span className="font-bold text-emerald-500 text-xs">NOVO</span>
              )}
              {data.title}
            </h1>
            <h3 className="text-xs opacity-80">
              {data.updateAt.toISOString() !== data.createdAt.toISOString() && (
                <span>Editado </span>
              )}
              {formatDistanceToNow(data.updateAt, {
                addSuffix: true,
                locale: pt,
              })}
            </h3>
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'} size={'icon'} onClick={copyToClipboard}>
                <Copy size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copiar prompt</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {data.tags &&
          data.tags.map((tag) => (
            <Badge
              key={tag}
              variant={'secondary'}
              className="h-6 px-2 text-xs justify-start"
            >
              {tag}
            </Badge>
          ))}
      </div>

      <span className="text-xs mt-2 opacity-95 text-justify">
        Previa: {formatedText}
      </span>
    </div>
  )
}
