import AppContext from '@/components/app-context'
import { usePage } from '@inertiajs/inertia-react'
import axios from 'axios'
import { useContext, useState } from 'react'

export default function useVoteable(resource) {
  const page = usePage()
  const context = useContext(AppContext)

  const [upvotesCount, setUpvotesCount] = useState(resource.upvotes_count)
  const [downvotesCount, setDownvotesCount] = useState(resource.downvotes_count)
  const [currentVote, setCurrentVote] = useState(resource.personal_vote?.score)

  const upvote = () => {
    if (!page.props.auth.user) return context.toggleRegisterModal(true)
    if (currentVote === 1) return unvote()
    axios.post(resource.links.upvote)
    setUpvotesCount((count) => count + 1)
    setDownvotesCount((count) => (currentVote === -1 ? count - 1 : count))
    setCurrentVote(1)
  }

  const downvote = () => {
    if (!page.props.auth.user) return context.toggleRegisterModal(true)
    if (currentVote === -1) return unvote()
    axios.post(resource.links.downvote)
    setDownvotesCount((count) => count + 1)
    setUpvotesCount((count) => (currentVote === 1 ? count - 1 : count))
    setCurrentVote(-1)
  }

  const unvote = () => {
    axios.delete(resource.links.unvote)
    setUpvotesCount((count) => (currentVote === 1 ? count - 1 : count))
    setDownvotesCount((count) => (currentVote === -1 ? count - 1 : count))
    setCurrentVote(undefined)
  }

  return {
    upvotesCount,
    downvotesCount,
    currentVote,
    upvote,
    downvote,
    unvote,
  }
}
