export default function FeaturedPostsList({ featuredPosts, className }) {
  return (
    <div className={`${className} sticky top-20`}>
      <h6 className="font-semibold text-gray-400">Featured Posts</h6>
      <div className="mt-4 space-y-8">
        {featuredPosts.map((post) => (
          <article
            key={post.id}
            className="relative border border-gray-400 bg-white shadow-sm"
          >
            <header className="p-4">
              <h1 className="font-semibold leading-tight">{post.title}</h1>
            </header>
            <div>
              <img
                src={post.thumbnail}
                className="h-40 w-full object-cover"
                alt={post.title}
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
