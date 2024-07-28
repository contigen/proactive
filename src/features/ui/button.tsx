import { cn } from '&/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

export function Button({
  children,
  onClick,
  className,
  ...restProps
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={cn(`py-1 px-4 bg-blue-600 rounded-2xl text-white`, className)}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  )
}
