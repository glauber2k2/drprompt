import Header from '@/components/Header'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen">
      <Header />
      <ScrollArea className="h-[calc(100vh-5rem)] overflow-y-auto">
        {children}
      </ScrollArea>
    </div>
  )
}
