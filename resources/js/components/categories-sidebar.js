import { classNames } from '@/utils'
import { useState } from 'react'
import NavLink from './nav-link'

export default function CategoriesSidebar({ categories, className }) {
  const [showInMobile, toggleMobile] = useState(false)

  return (
    <aside
      className={classNames(
        'fixed inset-y-0 space-y-6 overflow-hidden overflow-y-scroll overscroll-contain p-6 md:block',
        showInMobile || 'hidden',
        className
      )}
    >
      <div className="space-y-4">
        <NavLink active href="#hot">
          🌶 Hot
        </NavLink>
        <NavLink href="#trending">🎙 Trending</NavLink>
        <NavLink href="#fresh">🍑 Fresh</NavLink>
      </div>
      <div className="space-y-3">
        <h6 className="font-semibold text-gray-400">All Categories</h6>
        {categories.map((category) => (
          <NavLink
            key={category.name}
            href={`#${category.name}`}
            thumbnail={category.thumbnail}
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
