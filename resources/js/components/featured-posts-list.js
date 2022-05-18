import useSticky from '@/hooks/sticky'
import axios from 'axios'
import { chunk } from 'lodash'
import { useEffect, useState } from 'react'
import OnDemand from './on-demand'

export default function FeaturedPostsList({ className }) {
  const [loading, setLoading] = useState(true)
  const [featuredPosts, setFeaturedPosts] = useState([])
  const { stickyRef, spacerRef, measureHeight } = useSticky()

  useEffect(() => {
    setLoading(true)

    axios.get(route('api.posts.featured')).then((res) => {
      setFeaturedPosts(res.data.data)
      setLoading(false)
      measureHeight()
    })
  }, [measureHeight])

  return (
    <div className={className}>
      <div ref={spacerRef}></div>
      <div className="sticky" ref={stickyRef}>
        <h6 className="font-semibold text-gray-400">Featured Posts</h6>
        <div className="mt-4 space-y-8 pb-8">
          {chunk(featuredPosts, 6).map((chunk, i) => (
            <OnDemand key={i} className="space-y-8">
              {chunk.map((post) => (
                <article key={post.id} className="border bg-white">
                  <h1 className="p-4 text-sm font-medium">{post.title}</h1>
                  <img
                    src={post.media[0].url}
                    className="h-40 w-full object-cover"
                    alt={post.title}
                    loading="lazy"
                  />
                </article>
              ))}
            </OnDemand>
          ))}
          {loading &&
            Array.from(Array(6).keys()).map((i) => (
              <div key={i} className="border bg-white">
                <div className="p-4 after:block after:h-4 after:rounded after:bg-gray-100"></div>
                <div className="h-40 w-full bg-gray-100 object-cover"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
