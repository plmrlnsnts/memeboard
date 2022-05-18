import { useCallback, useEffect, useRef, useState } from 'react'
import useScrollDirection from './scroll-direction'

let initialTop = undefined

export default function useSticky() {
  const stickyRef = useRef()
  const spacerRef = useRef()

  const [heightOverflow, setHeightOverflow] = useState(0)
  const scrollDirection = useScrollDirection()

  const measureHeight = useCallback(() => {
    setHeightOverflow(stickyRef.current.offsetHeight - window.innerHeight)
  }, [])

  useEffect(() => {
    initialTop = initialTop || stickyRef.current.getBoundingClientRect().top
    measureHeight()
  }, [measureHeight])

  useEffect(() => {
    if (window.scrollY === 0) return

    const rect = stickyRef.current.getBoundingClientRect()
    const setSpacerMargin = (value) => {
      spacerRef.current.style.marginTop = `${value}px`
    }

    if (scrollDirection === 'up' && rect.bottom === window.innerHeight) {
      setSpacerMargin(window.scrollY - heightOverflow - initialTop)
    } else if (scrollDirection === 'down' && rect.top === initialTop) {
      setSpacerMargin(window.scrollY)
    }
  }, [scrollDirection, heightOverflow])

  useEffect(() => {
    const setStickyPosition = ({ top, bottom }) => {
      stickyRef.current.style.top = top ? `${top}px` : null
      stickyRef.current.style.bottom = bottom ? `${bottom}px` : null
    }

    if (scrollDirection === 'up') {
      setStickyPosition({ bottom: (heightOverflow + initialTop) * -1 })
    } else {
      setStickyPosition({ top: heightOverflow * -1 })
    }
  }, [scrollDirection, heightOverflow])

  return {
    stickyRef,
    spacerRef,
    measureHeight,
  }
}
