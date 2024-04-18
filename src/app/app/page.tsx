import React from 'react'
import ListPrompts from './_components/ListPrompts'
import { getUserPrompts } from './_components/actions'

export default async function page() {
  const prompts = await getUserPrompts()

  console.log(prompts)
  return (
    <div className="py-10 p-4">
      <ListPrompts prompts={prompts} />
    </div>
  )
}
