import { Dialog } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

export default function Modal({
  open,
  onClose,
  children,
  title,
  width = 'w-full max-w-md',
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-gray-700/50" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className={`${width} relative my-8 inline-block transform overflow-hidden bg-white bg-black-noise bg-[length:700px] bg-center p-6 text-left align-middle shadow-xl`}
          >
            <div className="mb-6 flex items-center justify-between">
              <Dialog.Title as="h3" className="text-xl font-medium">
                {title}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-700 focus:outline-none"
                type="button"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  )
}
