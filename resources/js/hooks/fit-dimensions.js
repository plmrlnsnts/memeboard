import { useEffect, useState } from 'react'

export default function useFitDimensions(ref, original) {
  const [width, setWidth] = useState(original.width)
  const [height, setHeight] = useState(original.height)

  useEffect(() => {
    const aspectRatio = original.width / original.height
    const maxWidth = ref.current.offsetWidth
    const maxHeight = window.innerWidth > 768 ? 500 : 400

    let newWidth = width
    let newHeight = height

    if (newWidth < maxWidth) {
      newWidth = maxWidth
      newHeight = maxWidth / aspectRatio
    }

    if (newHeight <= maxHeight) {
      setWidth(newWidth)
      setHeight(newHeight)
      return
    }

    if (maxHeight * aspectRatio <= maxWidth) {
      newWidth = maxHeight * aspectRatio
      newHeight = maxHeight
    }

    if (maxWidth - newWidth <= maxWidth * 0.1) {
      newWidth = maxWidth
      newHeight = maxWidth / aspectRatio
    }

    setWidth(newWidth)
    setHeight(newHeight)
  }, [original.width, original.height, width, height])

  return { width, height }
}
