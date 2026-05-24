import { useState, useEffect, useRef } from 'react'

export default function RouteTransition({ children }) {
  const [display, setDisplay] = useState(children)
  const [animating, setAnimating] = useState(false)
  const prevRef = useRef(children)

  useEffect(() => {
    if (prevRef.current !== children) {
      setAnimating(true)
      setDisplay(prevRef.current)
      const t = setTimeout(() => {
        setDisplay(children)
        setAnimating(false)
        prevRef.current = children
      }, 200)
      return () => clearTimeout(t)
    }
  }, [children])

  return (
    <div
      className={`route-transition${animating ? ' route-transition--out' : ''}`}
      key={display === children ? 'current' : 'prev'}
    >
      {display}
    </div>
  )
}
