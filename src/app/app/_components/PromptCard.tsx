import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, Terminal } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import React from 'react'

export default function PromptCard() {
  return (
    <div className="border border-neutral-300 dark:border-neutral-800 h-48 rounded-lg p-6 flex flex-col gap-2">
      <div className="flex items-center">
        <div className="flex gap-2 items-center mr-auto">
          <Terminal />
          <span>
            <h1 className="text-sm font-medium">Nome_Prompt</h1>
            <h3 className="text-xs opacity-80">@glauber.sm</h3>
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'} size={'icon'}>
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

      <span className="text-xs mt-auto opacity-95">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        debitis laudantium, molestiae error aut repudiandae eligendi?
      </span>
    </div>
  )
}
