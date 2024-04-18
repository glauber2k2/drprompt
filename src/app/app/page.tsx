import React from 'react'
import ListPrompts from './_components/ListPrompts'
import { getAllPrompts } from './_components/actions'

export default async function page() {
  const prompts = await getAllPrompts()

  return (
    <div className="py-10 p-4">
      <ListPrompts prompts={prompts} />
    </div>
  )
}
