export function classNames(...args) {
  return args.filter(Boolean).join(' ')
}

export function fitDimensions(originalDimensions, maxWidth, maxHeight) {
  const aspectRatio = width / height

  // const maxHeight =
  //   window.innerWidth > 768 ? (maxWidth * 9) / 16 : maxWidth / aspectRatio

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
}
