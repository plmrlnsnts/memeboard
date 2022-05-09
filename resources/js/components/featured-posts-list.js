import useScrollDirection from '@/hooks/scroll-direction'
import { chunk } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import OnDemand from './on-demand'

export default function FeaturedPostsList({ featuredPosts, className }) {
  const ref = useRef()
  const [heightOverflow, setHeightOverflow] = useState(0)
  const [initialTopPosition, setInitialTopPosition] = useState(0)
  const [marginTop, setMarginTop] = useState(0)
  const [style, setStyle] = useState({})
  const scrollDirection = useScrollDirection()

  useEffect(() => {
    setHeightOverflow(ref.current.offsetHeight - window.innerHeight)
    setInitialTopPosition(ref.current.getBoundingClientRect().top)
  }, [])

  useEffect(() => {
    setMarginTop((prevMargin) => {
      if (window.scrollY === 0) return prevMargin

      const { top, bottom } = ref.current.getBoundingClientRect()

      if (scrollDirection === 'up' && bottom === window.innerHeight) {
        return window.scrollY - heightOverflow - initialTopPosition
      } else if (scrollDirection === 'down' && top === initialTopPosition) {
        return window.scrollY
      } else {
        return prevMargin
      }
    })
  }, [scrollDirection, heightOverflow, initialTopPosition])

  useEffect(() => {
    if (scrollDirection === 'down') {
      setStyle({ top: heightOverflow * -1 })
    } else {
      setStyle({ bottom: (heightOverflow + initialTopPosition) * -1 })
    }
  }, [scrollDirection, heightOverflow, initialTopPosition])

  return (
    <div className={className}>
      <div style={{ marginTop }}></div>
      <div className="sticky" ref={ref} style={style}>
        <h6 className="font-semibold text-gray-400">Featured Posts</h6>
        <div className="mt-4 space-y-8 pb-8">
          {chunk(featuredPosts, 6).map((chunk, i) => (
            <OnDemand key={i} className="space-y-8">
              {chunk.map((post) => (
                <article key={post.id} className="border bg-white">
                  <h1 className="p-4 text-sm font-medium">{post.title}</h1>
                  <img
                    src={post.media[0].url}
                    className="h-40 w-full object-cover"
                    alt={post.title}
                    loading="lazy"
                  />
                </article>
              ))}
            </OnDemand>
          ))}
        </div>
      </div>
    </div>
  )
}
