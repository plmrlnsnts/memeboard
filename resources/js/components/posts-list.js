import useIntersectionObserver from '@/hooks/intersection-observer'
import { classNames } from '@/utils'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import OnDemand from './on-demand'
import Post from './post'

export default function PostsList({ initialData = [], className = '' }) {
  const loaderRef = useRef()
  const [chunks, setChunks] = useState(initialData)
  const [nextLink, setNextLink] = useState(initialData[0].links.next)
  const entry = useIntersectionObserver(loaderRef, { rootMargin: '50% 0px' })

  useEffect(() => {
    if (!entry?.isIntersecting) return

    axios.get(nextLink).then((res) => {
      setChunks((oldChunks) => [...oldChunks, res.data])
      setNextLink(res.data.links.next)
    })
  }, [entry, nextLink])

  return (
    <div className={classNames('space-y-4 md:space-y-8', className)}>
      {chunks.map((posts, i) => (
        <OnDemand key={i} className="space-y-4 md:space-y-8">
          {posts.data.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </OnDemand>
      ))}

      <div className="text-center text-sm font-medium" ref={loaderRef}>
        {nextLink === null ? "That's all folks." : 'Loading...'}
      </div>
    </div>
  )
}
