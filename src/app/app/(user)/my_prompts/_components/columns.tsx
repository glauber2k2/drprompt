'use client'

import { Badge } from '@/components/ui/badge'
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
    meta: { className: 'hidden sm:block' },
  },
  {
    accessorKey: 'title',
    header: 'Titulo',
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    meta: { className: 'hidden sm:block' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ getValue }: { getValue: any }) => (
      <div className="flex items-center gap-2">
        {getValue().map((tag: string, index: number) => (
          <Badge key={index} variant={'secondary'}>
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
]
