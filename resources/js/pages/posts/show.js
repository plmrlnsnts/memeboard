import AppContext from '@/components/app-context'
import FancyButton from '@/components/fancy-button'
import Post from '@/components/post'
import PostsList from '@/components/posts-list'
import ThreeColumnLayout from '@/components/three-column-layout'
import useManualScrollRestoration from '@/hooks/manual-scroll-restoration'
import useVoteable from '@/hooks/voteable'
import { formatDistanceToNow } from '@/lib/date'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { useContext } from 'react'
import { GoArrowDown, GoArrowUp } from 'react-icons/go'

export default function ShowPost({ post, next_posts }) {
  useManualScrollRestoration()

  return (
    <ThreeColumnLayout>
      <Post post={post.data} />
      <section className="px-4 md:px-0">
        <h3 className="mt-8 text-lg font-semibold">
          {post.data.replies.length} Replies
        </h3>
        <ReplyForm post={post.data} />
        <RepliesList className="mt-8" post={post.data} />
      </section>
      <hr className="mt-8 border-dashed" />
      <h3 className="mt-8 px-4 text-lg font-semibold md:px-0">
        More posts from Memeboard
      </h3>
      <PostsList className="mt-4" initialData={[next_posts]} />
    </ThreeColumnLayout>
  )
}

function ReplyForm({ post }) {
  const page = usePage()
  const { toggleRegisterModal } = useContext(AppContext)
  const form = useForm({ body: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    form.post(post.links.reply, {
      preserveScroll: true,
      preserveState: false,
    })
  }

  return (
    <div className="mt-4">
      {page.props.auth.user !== null ? (
        <div className="flex items-center space-x-4 md:space-x-6">
          <img
            src={page.props.auth.user.profile_photo_url}
            alt={`${page.props.auth.user.name} avatar`}
            className="h-8 w-8 rounded-full md:h-10 md:w-10"
          />
          <button className="flex flex-1 border px-4 py-3 text-gray-500 hover:border-gray-500">
            Leave a reply
          </button>
        </div>
      ) : (
        <div className="-mx-4 flex flex-col items-center justify-between border-y px-4 py-6 md:mx-0 md:border md:px-6 md:py-12">
          <div className="flex items-center -space-x-2">
            <img
              className="h-10 w-10 rounded-full border-2 border-white"
              src="https://source.boringavatars.com/beam/120/steve"
              alt="steve"
            />
            <img
              className="h-10 w-10 rounded-full border-2 border-white"
              src="https://source.boringavatars.com/beam/120/tony"
              alt="tony"
            />
            <img
              className="h-10 w-10 rounded-full border-2 border-white"
              src="https://source.boringavatars.com/beam/120/bruce"
              alt="bruce"
            />
          </div>
          <h2 className="mt-4 text-center text-lg font-semibold">
            Join the discussion
          </h2>
          <p className="mt-2 max-w-[260px] text-center text-gray-700">
            Looking to share your feedback and join in on the conversation?
          </p>
          <FancyButton
            className="mt-6 px-3 py-2"
            onClick={() => toggleRegisterModal(true)}
          >
            Sign up to Memeboard
          </FancyButton>
        </div>
      )}
    </div>
  )
}

function RepliesList({ post, className }) {
  return (
    <div className={`${className} space-y-8`}>
      {post.replies.map((reply) => (
        <RepliesListItem key={reply.id} reply={reply} />
      ))}
    </div>
  )
}

function RepliesListItem({ reply }) {
  const voteable = useVoteable(reply)

  return (
    <div className="flex items-start">
      <img
        src={reply.user.profile_photo_url}
        alt={`${reply.user.name} avatar`}
        className="mr-4 h-8 w-8 rounded-full md:mr-6 md:h-10 md:w-10"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <div className="font-semibold">{reply.user.name}</div>
          <span className="text-gray-700">•</span>
          <time className="text-gray-700" dateTime={reply.created_at}>
            {formatDistanceToNow(reply.created_at)}
          </time>
        </div>
        <div className="mt-1">{reply.body}</div>
        <div className="flex items-center space-x-6">
          <button
            className="group flex items-center justify-center py-2 text-sm font-medium"
            onClick={voteable.upvote}
            type="button"
          >
            <GoArrowUp
              className={[
                'mr-2 h-5 w-5',
                voteable.currentVote === 1
                  ? 'text-teal-500'
                  : 'text-gray-500 group-hover:text-gray-700',
              ].join(' ')}
            />
            <span>{voteable.upvotesCount}</span>
          </button>
          <button
            className="group flex items-center justify-center py-2 text-sm font-medium"
            onClick={voteable.downvote}
            type="button"
          >
            <GoArrowDown
              className={[
                'mr-2 h-5 w-5',
                voteable.currentVote === -1
                  ? 'text-teal-500'
                  : 'text-gray-500 group-hover:text-gray-700',
              ].join(' ')}
            />
            <span>{voteable.downvotesCount}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
