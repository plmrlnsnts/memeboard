import useFluidDimensions from '@/hooks/fluid-dimensions'
import useIntersectionObserver from '@/hooks/intersection-observer'
import { formatDistanceToNow } from '@/lib/date-format'
import { Popover } from '@headlessui/react'
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
    <article className="relative border border-gray-400 bg-white shadow-sm">
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
        <h1 className="text-xl font-semibold leading-tight">{post.title}</h1>
      </header>
      {post.type === 'photo' ? (
        <ImageMedia post={post} />
      ) : (
        <VideoMedia post={post} />
      )}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center divide-x">
          <button className="flex items-center justify-center px-4 py-2 text-sm font-medium hover:bg-gray-100">
            <GoArrowUp className="mr-2 h-5 w-5 text-gray-700" />
            <span>{post.upvotes_count}</span>
          </button>
          <button className="flex items-center justify-center px-4 py-2 text-sm font-medium hover:bg-gray-100">
            <GoArrowDown className="mr-2 h-5 w-5 text-gray-700" />
            <span>{post.downvotes_count}</span>
          </button>
          <button className="flex items-center justify-center px-4 py-2 text-sm font-medium hover:bg-gray-100">
            <IoChatboxEllipses className="mr-2 h-5 w-5 text-gray-700" />
            <span>{post.comments_count}</span>
          </button>
        </div>
        <div>
          <button className="flex items-center justify-center px-4 py-2 text-sm font-medium hover:bg-gray-100">
            <IoShareSocial className="mr-2 h-5 w-5 text-gray-700" />
            <span className="flex-1">Share</span>
          </button>
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
        className="flex items-center justify-center text-gray-500 focus:text-black focus:outline-none"
        aria-label="settings"
      >
        <CgMoreAlt className="h-6 w-6" />
      </Popover.Button>
      <Popover.Panel className="absolute right-0 left-1/2 z-[5] w-40 -translate-x-1/2 border border-gray-400 bg-white">
        <div className="py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Download
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Save
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            I don&apos;t like this
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Report
          </a>
        </div>
      </Popover.Panel>
    </Popover>
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

  const [parentRef, dimensions] = useFluidDimensions(
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

  const handleWrapperClick = () => {
    if (hasAudio) {
      toggleVolume(isMuted)
    } else {
      toggleVideo(!isPlaying)
    }
  }

  return (
    <div
      onClick={handleWrapperClick}
      className="relative flex items-center justify-center focus:outline-none"
      ref={parentRef}
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
      {!isPlaying && !hasAudio && <GifIndicator />}
      {!isPlaying && hasAudio && <PlayIndicator />}
      {hasAudio && <VolumeIndicator isMuted={isMuted} />}
    </div>
  )
}

function PlayIndicator() {
  return <IoPlayCircle className="absolute h-20 w-20 text-white drop-shadow" />
}

function GifIndicator() {
  return (
    <div
      className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl text-white"
      aria-hidden="true"
    >
      GIF
    </div>
  )
}

function VolumeIndicator({ isMuted }) {
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
