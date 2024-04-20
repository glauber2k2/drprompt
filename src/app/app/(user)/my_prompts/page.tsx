import React from 'react'

import { getUserPrompts } from '../../_components/actions'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import AddPromptModal from './_components/AddPromptModal'
import { Button } from '@/components/ui/button'

export default async function page() {
  const prompts = await getUserPrompts()

  return (
    <div className="py-10 p-4 space-y-4">
      <AddPromptModal asChild>
        <Button className="flex ml-auto" variant={'secondary'}>
          Adicionar prompt
        </Button>
      </AddPromptModal>
      <DataTable columns={columns} data={prompts} />
    </div>
  )
}
