import { useEffect, useRef } from 'react'

export default function useIntersectionObserver(
  handler,
  options = {},
  deps = []
) {
  const ref = useRef()

  useEffect(() => {
    const elements = ref.current instanceof Array ? ref.current : [ref.current]

    const observer = new IntersectionObserver(handler, options)
    elements.filter(Boolean).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, deps)

  return ref
}
