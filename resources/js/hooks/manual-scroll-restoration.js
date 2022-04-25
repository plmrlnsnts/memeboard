import { useEffect } from 'react'

export default function useManualScrollRestoration() {
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual'
    } else {
      window.onbeforeunload = () => window.scrollTo(0, 0)
    }
  }, [])
}
