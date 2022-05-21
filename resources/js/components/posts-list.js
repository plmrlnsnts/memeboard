import useIntersectionObserver from '@/hooks/intersection-observer'
import axios from 'axios'
import { useState } from 'react'
import OnDemand from './on-demand'
import Post from './post'

export default function PostsList({ initialData = [], className = '' }) {
  const [chunks, setChunks] = useState(initialData)
  const [nextLink, setNextLink] = useState(initialData[0].links.next)

  const loadMore = () => {
    axios.get(nextLink).then((res) => {
      setChunks((oldChunks) => [...oldChunks, res.data])
      setNextLink(res.data.links.next)
    })
  }

  const loaderRef = useIntersectionObserver(
    ([entry]) => entry.isIntersecting && loadMore(),
    { rootMargin: '50% 0px' }
  )

  return (
    <div className={`${className} space-y-4 md:space-y-8`}>
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
