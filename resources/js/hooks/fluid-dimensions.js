import { useEffect, useRef, useState } from 'react'

export default function useFluidDimensions(initialWidth, initialHeight) {
  const ref = useRef()
  const aspectRatio = initialWidth / initialHeight
  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)

  useEffect(() => {
    const maxWidth = ref.current.offsetWidth
    const maxHeight = (maxWidth * 9) / 16

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
  }, [aspectRatio, width, height])

  return [ref, { width, height }]
}
