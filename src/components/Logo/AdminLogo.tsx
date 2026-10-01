import { Logo } from './Logo'

export function AdminLogo() {
  return (
    <div className="size-40 flex place-content-center">
      <Logo loading="eager" priority="high" className="invert dark:invert-0 w-full h-full " />
    </div>
  )
}
