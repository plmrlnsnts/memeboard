import { useEffect, useRef } from 'react'

export default function Textarea(props) {
  const elementRef = useRef()
  const borderWidth = useRef(0)

  useEffect(() => {
    const { offsetHeight, clientHeight } = elementRef.current
    borderWidth.current = offsetHeight - clientHeight
  }, [])

  const handleChange = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight + borderWidth.current}px`
    props.onChange(e.target.value)
  }

  return (
    <textarea
      ref={elementRef}
      {...props}
      value={props.value}
      onChange={handleChange}
    ></textarea>
  )
}
