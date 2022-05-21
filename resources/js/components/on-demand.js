import useIntersectionObserver from '@/hooks/intersection-observer'
import { useEffect, useRef, useState } from 'react'

export default function OnDemand({ children, ...props }) {
  const containerRef = useRef()
  const [minHeight, setMinHeight] = useState(0)
  const [visible, setVisible] = useState(true)
  const entry = useIntersectionObserver(containerRef)

  useEffect(() => {
    if (entry === undefined) return
    setMinHeight(containerRef.current.offsetHeight)
    setVisible(entry.isIntersecting)
  }, [entry])

  return (
    <div ref={containerRef} style={{ minHeight }} {...props}>
      {visible && children}
    </div>
  )
}
