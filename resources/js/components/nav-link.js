import { Link } from '@inertiajs/inertia-react'

export default function NavLink({ children, active, thumbnail, ...props }) {
  return (
    <Link
      {...props}
      className={[
        active ? 'text-black' : 'text-gray-500 hover:text-black',
        'group flex w-full items-center text-lg font-semibold leading-none',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {thumbnail && (
        <img
          src={thumbnail}
          className={[
            active || 'opacity-75 group-hover:opacity-100',
            'mr-2 h-6 w-6 rounded object-cover',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      )}
      <span className="relative">
        {active && (
          <span className="absolute h-full w-full -rotate-6 bg-gradient-to-r from-yellow-500"></span>
        )}
        <span className="relative">{children}</span>
      </span>
    </Link>
  )
}
