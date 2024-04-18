import Image from 'next/image'
import AuthForm from './_components/AuthForm'

export default function auth() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:flex h-screen w-full items-center justify-center bg-neutral-900 flex-col gap-8">
        <Image
          src="/logo.png"
          alt="Image"
          width="1920"
          height="1080"
          className="w-1/2 h-1/2 invert object-scale-down dark:brightness-[0.2] dark:grayscale"
        />
        <h1 className="text-4xl font-thin">DrPrompt</h1>
      </div>
      <div className="flex items-center justify-center p-4">
        <AuthForm />
      </div>
    </div>
  )
}
