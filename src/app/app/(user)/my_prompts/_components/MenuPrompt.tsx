'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MoreVertical, PenLine, Trash2 } from 'lucide-react'
import { deletePromptAction } from './actions'
import AddPromptModal from './AddPromptModal'
import { useState } from 'react'

interface MenuPromptProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataPrompt: any
}

export default function MenuPrompt({ dataPrompt }: MenuPromptProps) {
  const [openPopover, setOpenPopover] = useState(false)

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild onClick={() => setOpenPopover(true)}>
        <Button variant={'ghost'} size={'icon'}>
          <MoreVertical size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <AddPromptModal asChild dataPrompt={dataPrompt}>
          <Button size={'sm'} variant={'ghost'} className="justify-between">
            Editar
            <PenLine size={16} />
          </Button>
        </AddPromptModal>
        <Button
          size={'sm'}
          variant={'ghost'}
          className="justify-between text-red-500"
          onClick={async () => {
            await deletePromptAction(dataPrompt.id)
            setOpenPopover(false)
          }}
        >
          Deletar
          <Trash2 size={16} />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
