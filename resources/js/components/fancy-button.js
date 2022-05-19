import { classNames } from '@/utils'
import { forwardRef } from 'react'

const FancyButton = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={classNames(
        className,
        'bg-teal-300 text-black before:border-teal-700',
        'relative flex items-center justify-center font-semibold disabled:opacity-50',
        'before:absolute before:inset-0 before:translate-y-1 before:-translate-x-1 before:border before:transition',
        'hover:before:translate-x-0 hover:before:translate-y-0'
      )}
    >
      {children}
    </button>
  )
})

FancyButton.displayName = 'FancyButton'

export default FancyButton
