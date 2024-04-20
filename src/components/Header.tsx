import React from 'react'
import AuthButton from './AuthButton'
import Link from 'next/link'

export default function Header() {
  return (
    <div className="h-20 px-8 flex items-center border-b border-neutral-300 dark:border-neutral-800 gap-2">
      <Link href={'/'} className="flex items-center gap-2 mr-auto">
        <img
          src="/logo.png"
          className="invert dark:invert-0 object-scale-down w-10 h-10"
        />
        <span className="text-2xl hidden md:block">DrPrompt</span>
      </Link>
      <Link href={'/'} className="text-sm opacity-90">
        Favoritos
      </Link>
      <AuthButton />
    </div>
  )
}
