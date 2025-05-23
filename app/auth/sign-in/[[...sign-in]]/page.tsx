import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex flex-col items-center justify-center gap-4 p-4'>
    <h1 className='text-2xl font-bold'>Hola, bienvenido de nuevo 👋</h1>
    <p className='text-sm text-muted-foreground'>Inicia sesión para continuar</p>
      <SignIn />
  </div>

}