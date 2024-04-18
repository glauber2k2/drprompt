import React from 'react'
import PromptCard from './PromptCard'
import { Input } from '@/components/ui/input'
import { ChevronDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function ListPrompts() {
  return (
    <div className="mx-auto md:w-2/3 space-y-4">
      <div className="flex items-center gap-2 justify-center">
        <span className="flex items-center gap-2 border border-neutral-300 dark:border-neutral-800 rounded-md px-4 flex-1">
          <Search size={16} />
          <Input
            className="border-none focus-visible:ring-[0] ring-offset-0"
            placeholder="Buscar prompt..."
          />
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              Ordenar por nome <ChevronDown size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Button variant={'outline'}>Ordenar por nome</Button>
            <Button variant={'outline'}>Ordenar por data</Button>
          </PopoverContent>
        </Popover>

        <Button variant={'outline'}>Ordenar</Button>
        <Button variant={'outline'}>Ordenar</Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </div>
    </div>
  )
}
