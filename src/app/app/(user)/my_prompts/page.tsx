import React from 'react'

import { getUserPrompts } from '../../_components/actions'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'

export default async function page() {
  const prompts = await getUserPrompts()

  return (
    <div className="py-10 p-4">
      <DataTable columns={columns} data={prompts} />
    </div>
  )
}
