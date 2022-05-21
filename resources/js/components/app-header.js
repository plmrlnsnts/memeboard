import { Popover } from '@headlessui/react'
import { Inertia } from '@inertiajs/inertia'
import { Link, usePage } from '@inertiajs/inertia-react'
import { useContext, useEffect } from 'react'
import { GoChevronDown, GoPlus } from 'react-icons/go'
import AppContext from './app-context'
import FancyButton from './fancy-button'
import LoginForm from './login-form'
import Modal from './modal'
import RegisterForm from './register-form'

export default function AppHeader() {
  const page = usePage()
  const context = useContext(AppContext)

  const handleAlreadyAMember = () => {
    context.toggleRegisterModal(false)
    context.toggleLoginModal(true)
  }

  useEffect(() => {
    return Inertia.on('success', () => {
      context.toggleRegisterModal(false)
      context.toggleLoginModal(false)
    })
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4 md:px-6">
        <Link
          href={route('home')}
          className="relative flex items-center self-stretch font-headline text-2xl font-extrabold tracking-tighter"
        >
          <span className="absolute h-full w-full bg-black-noise bg-[length:600px] bg-center"></span>
          <span className="relative">memeboard</span>
          <span className="absolute h-full w-full bg-white-noise bg-[length:700px] bg-center"></span>
        </Link>
        {page.props.auth.user ? (
          <div className="flex items-center space-x-6">
            <FancyButton
              className="px-3 py-1"
              onClick={() => Inertia.visit(route('posts.create'))}
              type="button"
            >
              <span>Upload</span>
              <GoPlus className="ml-2 h-4 w-4" />
            </FancyButton>
            <AccountPopover user={page.props.auth.user} />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              className="font-semibold"
              onClick={() => context.toggleLoginModal(true)}
              type="button"
            >
              Log In
            </button>
            <FancyButton
              className="px-3 py-1"
              onClick={() => context.toggleRegisterModal(true)}
              type="button"
            >
              Sign up
            </FancyButton>
          </div>
        )}
      </header>

      <Modal
        open={context.openLoginModal}
        onClose={() => context.toggleLoginModal(false)}
        title="Sign in to your account"
      >
        <LoginForm />
      </Modal>

      <Modal
        open={context.openRegisterModal}
        onClose={() => context.toggleRegisterModal(false)}
      >
        <RegisterForm alreadyAMember={handleAlreadyAMember} />
      </Modal>
    </>
  )
}

function AccountPopover({ user }) {
  return (
    <Popover className="relative">
      <Popover.Button
        type="button"
        className="flex items-center justify-center space-x-2 font-semibold"
        aria-label="account settings"
      >
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={user.profile_photo_url}
          alt="your profile photo"
        />
        <span className="hidden md:inline">{user.name}</span>
        <GoChevronDown className="hidden h-4 w-4 text-gray-400 md:inline" />
      </Popover.Button>
      <Popover.Panel className="absolute right-0 mt-2 w-48 translate-x-2 border border-gray-400 bg-white">
        <div className="py-1">
          <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100"
          >
            Account Settings
          </button>
          <Link
            as="button"
            href={route('logout')}
            method="post"
            type="button"
            className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100"
          >
            Log Out
          </Link>
        </div>
      </Popover.Panel>
    </Popover>
  )
}
