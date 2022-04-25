import { forwardRef } from 'react'

const OutlinedButton = forwardRef(({ children, className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={`${className} flex items-center justify-center border border-gray-400 font-medium hover:border-gray-600`}
  >
    {children}
  </button>
))

OutlinedButton.displayName = 'OutlinedButton'

export default OutlinedButton
