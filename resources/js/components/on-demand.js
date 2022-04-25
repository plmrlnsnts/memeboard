import useIntersectionObserver from '@/hooks/intersection-observer'
import { useState } from 'react'

export default function OnDemand({ children, ...props }) {
  const [height, setHeight] = useState()
  const [visible, setVisible] = useState(true)

  const containerRef = useIntersectionObserver(([entry]) => {
    setHeight(containerRef.current.offsetHeight)
    setVisible(entry.isIntersecting)
  })

  return (
    <div ref={containerRef} style={{ minHeight: `${height}px` }} {...props}>
      {visible && children}
    </div>
  )
}
