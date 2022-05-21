import AppContext from '@/components/app-context'
import FancyButton from '@/components/fancy-button'
import Post from '@/components/post'
import PostsList from '@/components/posts-list'
import Textarea from '@/components/textarea'
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
    form.post(post.links.comment, {
      preserveScroll: true,
      preserveState: false,
    })
  }

  return (
    <div className="mt-4">
      {page.props.auth.user !== null ? (
        <form onSubmit={handleSubmit} className="flex items-start">
          <img
            src={page.props.auth.user.profile_photo_url}
            alt={`${page.props.auth.user.name} avatar`}
            className="mr-4 h-8 w-8 rounded-full md:mr-6 md:h-10 md:w-10"
          />
          <div className="flex-1">
            <Textarea
              className="block w-full border px-3 py-2 focus:outline-none"
              onChange={(value) => form.setData('body', value)}
              placeholder="Write a commment"
              rows="4"
              value={form.data.body}
            />
            <div className="mt-4 flex justify-end">
              <FancyButton type="submit" className="px-3 py-1">
                Comment
              </FancyButton>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between border p-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Join the discussion</h2>
            <p className="text-gray-700">
              Looking to share your feedback and join on the conversation?
            </p>
          </div>
          <FancyButton
            className="px-3 py-2"
            onClick={() => toggleRegisterModal(true)}
          >
            Sign up
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
