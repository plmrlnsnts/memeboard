import useFitDimensions from '@/hooks/fit-dimensions'
import useIntersectionObserver from '@/hooks/intersection-observer'
import useVoteable from '@/hooks/voteable'
import { formatDistanceToNow } from '@/lib/date'
import { classNames } from '@/utils'
import { Popover } from '@headlessui/react'
import { Link } from '@inertiajs/inertia-react'
import { useEffect, useRef, useState } from 'react'
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
    <article className="relative border-y bg-white md:border">
      <header className="space-y-2 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 md:text-base">
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
        <Link
          href={post.links.show}
          className="inline-block text-lg font-semibold leading-tight hover:text-teal-500 md:text-xl"
        >
          {post.title}
        </Link>
      </header>
      {post.type !== 'animated' ? (
        <ImageMedia post={post} />
      ) : (
        <VideoMedia post={post} />
      )}
      <div className="flex items-center justify-between md:mt-6">
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
      <Popover.Panel className="absolute right-0 z-[5] w-40 border bg-white lg:left-1/2 lg:-translate-x-1/2">
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
        <IoShareSocial className="h-5 w-5 text-gray-500 group-hover:text-gray-700 md:mr-2" />
        <span className="hidden flex-1 md:inline-flex">Share</span>
      </Popover.Button>
      <Popover.Panel className="absolute bottom-full right-0 z-[5] mb-2 w-40 border bg-white md:left-1/2 md:-translate-x-1/2">
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
  const voteable = useVoteable(post)

  return (
    <div className="flex flex-1 items-center divide-x md:flex-none">
      <button
        className="group flex w-full items-center justify-center px-4 py-2 text-sm font-medium md:w-24"
        onClick={voteable.upvote}
        type="button"
      >
        <GoArrowUp
          className={classNames(
            'mr-2 h-6 w-6',
            voteable.currentVote === 1
              ? 'text-teal-500'
              : 'text-gray-500 group-hover:text-gray-700'
          )}
        />
        <span>{voteable.upvotesCount}</span>
      </button>
      <button
        className="group flex w-full items-center justify-center px-4 py-2 text-sm font-medium md:w-24"
        onClick={voteable.downvote}
        type="button"
      >
        <GoArrowDown
          className={classNames(
            'mr-2 h-6 w-6',
            voteable.currentVote === -1
              ? 'text-teal-500'
              : 'text-gray-500 group-hover:text-gray-700'
          )}
        />
        <span>{voteable.downvotesCount}</span>
      </button>
      <button className="group flex w-full items-center justify-center px-4 py-2 text-sm font-medium md:w-24">
        <IoChatboxEllipses className="mr-2 h-5 w-5 text-gray-500 group-hover:text-gray-700" />
        <span>{post.replies_count}</span>
      </button>
    </div>
  )
}

function ImageMedia({ post }) {
  return (
    <div className="flex justify-center">
      <img
        alt={post.title}
        height={post.media[0].height}
        loading="lazy"
        src={post.media[0].url}
        width={post.media[0].width}
      />
    </div>
  )
}

function VideoMedia({ post }) {
  const media = post.media[0]
  const containerRef = useRef()
  const videoRef = useRef()

  const { width, height } = useFitDimensions(containerRef, media)
  const entry = useIntersectionObserver(videoRef, { threshold: 0.5 })

  useEffect(() => {
    if (entry === undefined) return
    toggleVideo(entry.isIntersecting)
  }, [entry])

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
    if (media.has_audio) {
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
        playsInline
        poster={post.media[0].poster}
        preload="auto"
        ref={videoRef}
        webkit-playsinline="true"
        style={{ width, height }}
      >
        <source src={post.media[0].url} type="video/mp4" />
      </video>
      {!isPlaying && !media.has_audio && <VideMediaGifIndicator />}
      {!isPlaying && media.has_audio && <VideoMediaPlayIndicator />}
      {media.has_audio && <VideoMediaVolumeIndicator isMuted={isMuted} />}
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
