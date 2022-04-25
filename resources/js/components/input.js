import { forwardRef } from 'react'

const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    {...props}
    ref={ref}
    className={`${className} form-input block w-full border-gray-300 bg-transparent font-medium placeholder-gray-400 transition focus:border-transparent focus:bg-white focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-2`}
  />
))

Input.displayName = 'Input'

export default Input
