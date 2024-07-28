import { cn } from '&/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

export function Badge({
  children,
  className,
  ...restProps
}: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      className={cn(
        `inline-block font-semibold rounded-xl px-2 border border-black text-sm`,
        className
      )}
      {...restProps}
    >
      {children}
    </span>
  )
}
