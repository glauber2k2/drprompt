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

export default function PromptCard({ data }: { data: Prompt }) {
  const { toast } = useToast()
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
    <div className="border border-neutral-300 dark:border-neutral-800 h-48 rounded-lg p-6 flex flex-col gap-2">
      <div className="flex items-center">
        <div className="flex gap-2 items-center mr-auto">
          <Terminal />
          <span>
            <h1 className="text-sm font-medium">{data.title}</h1>
            <h3 className="text-xs opacity-80">{data.userId || 'Undefined'}</h3>
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
      <div className="flex items-center gap-2">
        <Badge variant={'secondary'} className="h-6 px-2 text-xs justify-start">
          ChatGPT
        </Badge>
        <Badge variant={'secondary'} className="h-6 px-2 text-xs justify-start">
          BingAI
        </Badge>
        <Badge variant={'secondary'} className="h-6 px-2 text-xs justify-start">
          Gemini
        </Badge>
      </div>

      <span className="text-xs mt-2 opacity-95 text-justify">
        Previa: {formatedText}
      </span>
    </div>
  )
}
