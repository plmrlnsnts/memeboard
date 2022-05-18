import { forwardRef } from 'react'

const FancyButton = forwardRef(({ children, className, ...props }, ref) => {
  const styles = {
    primary: 'bg-teal-300 before:border-teal-700 text-black',
    secondary: 'bg-emerald-300 before:border-emerald-700 text-black',
  }

  return (
    <button
      {...props}
      ref={ref}
      className={[
        className,
        styles[props.color || 'primary'],
        'relative flex items-center justify-center font-semibold disabled:opacity-50',
        'before:absolute before:inset-0 before:translate-y-1 before:-translate-x-1 before:border before:transition',
        'hover:before:translate-x-0 hover:before:translate-y-0',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
})

FancyButton.displayName = 'FancyButton'

export default FancyButton
