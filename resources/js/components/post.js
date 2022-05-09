import useFluidDimensions from '@/hooks/fluid-dimensions'
import useIntersectionObserver from '@/hooks/intersection-observer'
import { formatDistanceToNow } from '@/lib/date'
import { Popover } from '@headlessui/react'
import axios from 'axios'
import { useState } from 'react'
import { CgMoreAlt } from 'react-icons/cg'
import { GoArrowDown, GoArrowUp } from 'react-icons/go'
import {
  IoChatboxEllipses,
  IoPlayCircle,
  IoShareSocial,
  IoVolumeHigh,
  IoVolumeMute,
} from 'react-icons/io5'

export default function Post({ post }) {
  return (
    <article className="relative border bg-white">
      <header className="space-y-2 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 font-medium text-gray-700">
            <span className="inline-flex items-center">
              <img
                src={post.category.thumbnail}
                alt={post.category.name}
                className="mr-1 h-4 w-4 rounded"
              />
              <span>{post.category.name}</span>
            </span>
            <span>•</span>
            <time dateTime={post.created_at}>
              {formatDistanceToNow(post.created_at)}
            </time>
          </div>
          <div>
            <SettingsPopover />
          </div>
        </div>
        <a
          href={post.links.show}
          className="inline-block text-xl font-semibold leading-tight hover:text-teal-500"
          target="_blank"
          rel="noreferrer"
        >
          {post.title}
        </a>
      </header>
      {post.type !== 'animated' ? (
        <ImageMedia post={post} />
      ) : (
        <VideoMedia post={post} />
      )}
      <div className="mt-6 flex items-center justify-between">
        <EngagementButtons post={post} />
        <div>
          <SharePopover />
        </div>
      </div>
    </article>
  )
}

function SettingsPopover() {
  return (
    <Popover className="relative">
      <Popover.Button
        type="button"
        className="flex items-center justify-center text-gray-500 hover:text-black focus:outline-none"
        aria-label="settings"
      >
        <CgMoreAlt className="h-6 w-6" />
      </Popover.Button>
      <Popover.Panel className="absolute right-0 left-1/2 z-[5] w-40 -translate-x-1/2 border bg-white">
        <div className="py-1">
          <button className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
            Download
          </button>
          <button className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
            Save
          </button>
          <button className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
            I don&apos;t like this
          </button>
          <button className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
            Report
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

function SharePopover() {
  return (
    <Popover className="relative">
      <Popover.Button
        type="button"
        className="group flex items-center justify-center px-4 py-2 text-sm font-medium focus:outline-none"
        aria-label="share"
      >
        <IoShareSocial className="mr-2 h-5 w-5 text-gray-500 group-hover:text-gray-700" />
        <span className="flex-1">Share</span>
      </Popover.Button>
      <Popover.Panel className="absolute bottom-full right-0 left-1/2 z-[5] mb-2 w-40 -translate-x-1/2 border bg-white">
        <div className="py-1">
          <button className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
            Copy Link
          </button>
          <button className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
            Share to Facebook
          </button>
          <button className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
            Send to Messenger
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

function EngagementButtons({ post }) {
  const [upvotesCount, setUpvotesCount] = useState(post.upvotes_count)
  const [downvotesCount, setDownvotesCount] = useState(post.downvotes_count)
  const [previousVote, setPreviousVote] = useState(post.personal_vote?.score)

  const upvotePost = () => {
    if (previousVote === 1) return unvotePost()
    axios.post(route('api.posts.upvote', post))
    setUpvotesCount((count) => count + 1)
    setDownvotesCount((count) => (previousVote === -1 ? count - 1 : count))
    setPreviousVote(1)
  }

  const downvotePost = () => {
    if (previousVote === -1) return unvotePost()
    axios.post(route('api.posts.downvote', post))
    setDownvotesCount((count) => count + 1)
    setUpvotesCount((count) => (previousVote === 1 ? count - 1 : count))
    setPreviousVote(-1)
  }

  const unvotePost = () => {
    axios.post(route('api.posts.unvote', post))
    setUpvotesCount((count) => (previousVote === 1 ? count - 1 : count))
    setDownvotesCount((count) => (previousVote === -1 ? count - 1 : count))
    setPreviousVote(undefined)
  }

  return (
    <div className="flex items-center divide-x">
      <button
        className="group flex w-24 items-center justify-center px-4 py-2 text-sm font-medium"
        onClick={upvotePost}
        type="button"
      >
        <GoArrowUp
          className={[
            'mr-2 h-6 w-6',
            previousVote === 1
              ? 'text-teal-500'
              : 'text-gray-500 group-hover:text-gray-700',
          ].join(' ')}
        />
        <span>{upvotesCount}</span>
      </button>
      <button
        className="group flex w-24 items-center justify-center px-4 py-2 text-sm font-medium"
        onClick={downvotePost}
        type="button"
      >
        <GoArrowDown
          className={[
            'mr-2 h-6 w-6',
            previousVote === -1
              ? 'text-teal-500'
              : 'text-gray-500 group-hover:text-gray-700',
          ].join(' ')}
        />
        <span>{downvotesCount}</span>
      </button>
      <button className="group flex w-24 items-center justify-center px-4 py-2 text-sm font-medium">
        <IoChatboxEllipses className="mr-2 h-5 w-5 text-gray-500 group-hover:text-gray-700" />
        <span>{post.comments_count}</span>
      </button>
    </div>
  )
}

function ImageMedia({ post }) {
  return (
    <div className="flex justify-center">
      <img
        src={post.media[0].url}
        width={post.media[0].width}
        height={post.media[0].height}
        alt={post.title}
        loading="lazy"
      />
    </div>
  )
}

function VideoMedia({ post }) {
  const hasAudio = post.media[1].has_audio

  const [containerRef, dimensions] = useFluidDimensions(
    post.media[1].width,
    post.media[1].height
  )

  const videoRef = useIntersectionObserver(
    ([entry]) => toggleVideo(entry.isIntersecting),
    { threshold: 0.5 }
  )

  const [isPlaying, setPlaying] = useState(false)
  const [isMuted, setMuted] = useState(false)

  const toggleVideo = (shouldPlay) => {
    if (shouldPlay && videoRef.current.paused) {
      videoRef.current.muted = true
      videoRef.current.play()
    } else if (!videoRef.current.paused) {
      videoRef.current.pause()
    }

    setPlaying(!videoRef.current.paused)
    setMuted(videoRef.current.muted)
  }

  const toggleVolume = (shouldPlay) => {
    videoRef.current.muted = !shouldPlay
    setMuted(!shouldPlay)
  }

  const handleContainerClick = () => {
    if (hasAudio) {
      toggleVolume(isMuted)
    } else {
      toggleVideo(!isPlaying)
    }
  }

  return (
    <div
      onClick={handleContainerClick}
      className="relative flex items-center justify-center focus:outline-none"
      ref={containerRef}
    >
      <video
        loop
        poster={post.media[0].url}
        preload="auto"
        ref={videoRef}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <source src={post.media[1].url} type="video/mp4" />
      </video>
      {!isPlaying && !hasAudio && <VideMediaGifIndicator />}
      {!isPlaying && hasAudio && <VideoMediaPlayIndicator />}
      {hasAudio && <VideoMediaVolumeIndicator isMuted={isMuted} />}
    </div>
  )
}

function VideoMediaPlayIndicator() {
  return <IoPlayCircle className="absolute h-20 w-20 text-white drop-shadow" />
}

function VideMediaGifIndicator() {
  return (
    <div
      className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl text-white"
      aria-hidden="true"
    >
      GIF
    </div>
  )
}

function VideoMediaVolumeIndicator({ isMuted }) {
  return (
    <div className="absolute bottom-0 left-0 px-6 py-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
        {isMuted ? (
          <IoVolumeMute className="h-6 w-6" />
        ) : (
          <IoVolumeHigh className="h-6 w-6" />
        )}
      </span>
    </div>
  )
}
