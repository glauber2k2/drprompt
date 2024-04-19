import { ReactNode } from 'react'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { ScrollArea } from '@/components/ui/scroll-area'

function Layout({ children }: { children: ReactNode }) {
  const ua = userAgent({ headers: headers() })
  const viewport = ua.device.type === 'mobile' ? 'mobile' : 'desktop'

  if (viewport == 'mobile') {
    return (
      <div className={`h-full`}>
        <p>Menu</p>

        {children}
      </div>
    )
  } else {
    return (
      <div className={`grid grid-cols-[26rem_1fr]`}>
        <span className="border-r border-neutral-300 dark:border-neutral-800 h-full" />
        <ScrollArea className="h-[calc(100vh-5rem)] overflow-y-auto">
          {children}
        </ScrollArea>
      </div>
    )
  }
}

export default Layout
