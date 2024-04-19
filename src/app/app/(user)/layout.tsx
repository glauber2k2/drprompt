import { ReactNode } from 'react'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'

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
      <div className={`grid grid-cols-[26rem_1fr] h-full `}>
        <span className="border-r border-neutral-300 dark:border-neutral-800" />

        {children}
      </div>
    )
  }
}

export default Layout
