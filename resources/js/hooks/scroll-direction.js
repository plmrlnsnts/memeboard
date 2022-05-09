import { useEffect, useRef, useState } from 'react'

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('down')
  const prevScroll = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 0) return
      setScrollDirection(prevScroll.current > window.scrollY ? 'up' : 'down')
      prevScroll.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollDirection])

  return scrollDirection
}
