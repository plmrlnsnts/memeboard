import FancyButton from '@/components/fancy-button'
import Layout from '@/components/layout'
import Textarea from '@/components/textarea'
import { classNames } from '@/utils'
import { Listbox, Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/inertia-react'
import { useEffect, useRef, useState } from 'react'
import { GoChevronDown, GoX } from 'react-icons/go'

export default function CreatePost({ categories, accepted_media }) {
  const form = useForm({
    category_id: categories.data[0].id,
    title: '',
    media: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    form.post('/posts')
  }

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-6 w-full max-w-3xl px-6 md:my-12"
      >
        <CategoriesListbox
          categories={categories.data}
          value={form.data.category_id}
          onChange={(value) => form.setData('category_id', value)}
        />
        <div className="mt-2">
          <Textarea
            className="block w-full resize-none border-none px-0 text-2xl font-semibold focus:placeholder-gray-300 focus:outline-none md:text-3xl"
            placeholder="Title of this post?"
            value={form.data.title}
            onChange={(value) => form.setData('title', value)}
            rows="1"
          />
          <ErrorMessage error={form.errors.title} />
        </div>
        <div className="mt-4">
          <MediaPicker
            accept={accepted_media}
            onChange={(value) => form.setData('media', value)}
          />
          <ErrorMessage error={form.errors.media} />
        </div>
        <div className="mt-4 flex justify-end">
          <FancyButton className="px-3 py-2" disabled={form.processing}>
            Submit post
          </FancyButton>
        </div>
      </form>
    </Layout>
  )
}

function CategoriesListbox({ categories, value, onChange }) {
  const [selected, setSelected] = useState()

  useEffect(() => {
    setSelected(categories.find((category) => category.id === value))
  }, [value, categories])

  const handleOnChange = (category) => {
    setSelected(category)
    onChange(category?.id)
  }

  return (
    <Listbox
      as="div"
      className="relative inline-block"
      value={selected}
      onChange={handleOnChange}
    >
      <Listbox.Button className="flex items-center justify-center font-medium text-gray-700 focus:outline-none">
        <img
          src={selected?.thumbnail}
          alt={selected?.name}
          className="mr-2 h-5 w-5 rounded"
        />
        <span className="mr-1 text-sm md:text-base">{selected?.name}</span>
        <GoChevronDown className="h-4 w-4 text-gray-500" />
      </Listbox.Button>
      <Listbox.Options className="absolute left-0 mt-2 max-h-80 w-56 -translate-x-2 overflow-y-auto border border-gray-500 bg-white focus:outline-none">
        {categories.map((category) => (
          <Listbox.Option
            key={category.id}
            value={category}
            className={({ active }) =>
              classNames(
                'flex w-full items-center px-3 py-2',
                active && 'bg-teal-500 text-white'
              )
            }
          >
            <img
              src={category.thumbnail}
              alt={category.name}
              className="mr-2 h-5 w-5 rounded"
              loading="lazy"
            />
            <span className="mr-1">{category.name}</span>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

function MediaPicker({ onChange, accept = [] }) {
  const fileRef = useRef()
  const [filePreview, setFilePreview] = useState('')
  const [fileType, setFileType] = useState('image')

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) return
    setFilePreview(URL.createObjectURL(e.target.files[0]))
    setFileType(e.target.files[0].type.includes('image') ? 'image' : 'video')
    onChange(e.target.files[0])
  }

  const handleResetButtonClick = () => {
    fileRef.current.value = ''
    setFilePreview('')
  }

  return (
    <div
      className={classNames(
        'flex items-center justify-center overflow-hidden rounded p-6 md:h-[500px]',
        filePreview
          ? 'border border-gray-400'
          : 'border-2 border-dashed border-gray-300'
      )}
    >
      <input
        accept={accept.join(', ')}
        className="hidden"
        onChange={handleFileChange}
        ref={fileRef}
        type="file"
      />
      {filePreview === '' && (
        <div className="flex flex-col justify-center md:items-center">
          <svg
            className="h-16 w-16 md:h-24 md:w-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              className="text-emerald-300"
              fill="currentColor"
              d="M2.45153 5.94826C2.71842 4.12109 4.12109 2.71842 5.94826 2.45153C7.54228 2.21869 9.6618 2 12 2C14.3382 2 16.4577 2.21869 18.0517 2.45153C19.8789 2.71842 21.2816 4.12109 21.5485 5.94826C21.7813 7.54228 22 9.6618 22 12C22 14.3382 21.7813 16.4577 21.5485 18.0517C21.2816 19.8789 19.8789 21.2816 18.0517 21.5485C16.4577 21.7813 14.3382 22 12 22C9.6618 22 7.54228 21.7813 5.94826 21.5485C4.12109 21.2816 2.71842 19.8789 2.45153 18.0517C2.21869 16.4577 2 14.3382 2 12C2 9.6618 2.21869 7.54228 2.45153 5.94826Z"
            />
            <path
              className="text-teal-500"
              fill="currentColor"
              d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
            />
            <path
              className="text-teal-500"
              fill="currentColor"
              d="M21.6642 17.2016C21.7024 16.8989 21.5962 16.5963 21.3805 16.3806L17.4143 12.4144C16.6332 11.6334 15.3669 11.6334 14.5858 12.4144L11.7072 15.2931C11.3166 15.6836 10.6835 15.6836 10.293 15.2931L9.41427 14.4144C8.63322 13.6334 7.36689 13.6334 6.58584 14.4144L2.93337 18.0669C2.68517 18.3151 2.57669 18.679 2.70674 19.005C3.24439 20.3529 4.45448 21.3303 5.94832 21.5485C7.54234 21.7813 9.66186 22 12.0001 22C14.3383 22 16.4578 21.7813 18.0518 21.5485C19.879 21.2816 21.2816 19.8789 21.5485 18.0517C21.5878 17.7828 21.6267 17.499 21.6642 17.2016Z"
            />
          </svg>
          <p className="mt-4 font-medium text-gray-700 md:text-center md:text-lg">
            Drag and drop an image or video, or{' '}
            <button
              onClick={() => fileRef.current.click()}
              className="font-semibold text-teal-700 underline"
              type="button"
            >
              Browse
            </button>
          </p>
          <p className="mt-2 text-gray-500 md:text-center">
            1600x1200 or higher recommended. Max 10MB (20MB for videos)
          </p>
          <ul className="mt-8 grid list-inside list-disc gap-x-8 gap-y-2 text-gray-500 md:mt-12 md:grid-cols-2">
            <li>High resolution images (png, jpg, gif)</li>
            <li>Videos (mp4, 4:3, &lt;60secs)</li>
            <li>Animated gifs (4:3, 800x600 - 1600x1200)</li>
            <li>Only upload media you own the rights to</li>
          </ul>
        </div>
      )}
      <Transition
        show={filePreview !== ''}
        className="relative flex h-full w-full items-center justify-center"
        enter="transform transition duration-300 ease-out"
        enterFrom="opacity-0 scale-110"
        enterTo="opacity-100 scale-100"
      >
        <button
          type="button"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white ring-4 ring-gray-700/50"
          onClick={() => handleResetButtonClick()}
        >
          <GoX className="h-5 w-5" />
        </button>
        {fileType === 'image' ? (
          <img
            className="max-h-[50vh] w-auto object-contain"
            src={filePreview}
          />
        ) : (
          <video className="h-auto w-full" controls>
            <source src={filePreview}></source>
          </video>
        )}
      </Transition>
    </div>
  )
}

function ErrorMessage({ error }) {
  return error ? (
    <p className="mt-1 text-sm font-medium text-red-500">{error}</p>
  ) : null
}
