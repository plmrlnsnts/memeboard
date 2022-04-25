import { forwardRef } from 'react'

const FancyButton = forwardRef(({ children, className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={`${className} disable:opacity-50 relative flex items-center justify-center bg-emerald-300 font-semibold text-black before:absolute before:inset-0 before:translate-y-1 before:-translate-x-1 before:border before:border-emerald-700 before:transition hover:before:translate-x-0 hover:before:translate-y-0`}
  >
    {children}
  </button>
))

FancyButton.displayName = 'FancyButton'

export default FancyButton
