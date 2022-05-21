import { useEffect, useState } from 'react'

export default function useIntersectionObserver(ref, options = {}) {
  const [entry, setEntry] = useState()

  useEffect(() => {
    const handler = ([entry]) => setEntry(entry)
    const observer = new IntersectionObserver(handler, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return entry
}
