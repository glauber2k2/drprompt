'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  title: string
  tags: string[]
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'title',
    header: 'Titulo',
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
  },
]
