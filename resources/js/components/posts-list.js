import useIntersectionObserver from '@/hooks/intersection-observer'
import useSWRInfinite from 'swr/infinite'
import OnDemand from './on-demand'
import Post from './post'

export default function PostsList({ initialData, className }) {
  const { data: chunks, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (pageIndex === 0) return '/api/posts'
      if (previousPageData && !previousPageData.meta.next_cursor) return null
      return `api/posts?cursor=${previousPageData.meta.next_cursor}`
    },
    {
      fallbackData: initialData,
      revalidateOnMount: false,
      revalidateFirstPage: false,
    }
  )

  const loaderRef = useIntersectionObserver(
    ([entry]) => entry.isIntersecting && setSize((size) => size + 1),
    { rootMargin: '50% 0px' }
  )

  return (
    <div className={`${className} space-y-8`}>
      {chunks.map((posts, i) => (
        <OnDemand key={i} className="space-y-8">
          {posts.data.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </OnDemand>
      ))}

      <div className="text-center text-sm font-medium" ref={loaderRef}>
        {chunks[chunks.length - 1].next_cursor === null
          ? "That's all folks."
          : 'Loading...'}
      </div>
    </div>
  )
}
