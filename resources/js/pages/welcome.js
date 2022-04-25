import FancyButton from '@/components/fancy-button'
import FeaturedPostsList from '@/components/featured-posts-list'
import LoginForm from '@/components/login-form'
import Modal from '@/components/modal'
import NavLink from '@/components/nav-link'
import PostsList from '@/components/posts-list'
import RegisterForm from '@/components/register-form'
import useManualScrollRestoration from '@/hooks/manual-scroll-restoration'
import { Head, Link } from '@inertiajs/inertia-react'
import { useState } from 'react'

export default function Welcome(props) {
  const [openLogin, toggleLogin] = useState(false)
  const [openRegister, toggleRegister] = useState(false)

  const handleAlreadyAMember = () => {
    toggleRegister(false)
    toggleLogin(true)
  }

  useManualScrollRestoration()

  return (
    <>
      <Head title="Welcome" />

      <Modal
        open={openLogin}
        onClose={() => toggleLogin(false)}
        title="Sign in to your account"
      >
        <LoginForm />
      </Modal>

      <Modal open={openRegister} onClose={() => toggleRegister(false)}>
        <RegisterForm alreadyAMember={handleAlreadyAMember} />
      </Modal>

      <header className="fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-6">
        <Link
          href="/"
          className="relative flex items-center self-stretch font-headline text-2xl font-extrabold tracking-tighter"
        >
          <span className="absolute h-full w-full bg-black-noise bg-[length:600px] bg-center"></span>
          <span className="relative">memeboard</span>
          <span className="absolute h-full w-full bg-white-noise bg-[length:700px] bg-center"></span>
        </Link>
        <div className="flex items-center space-x-4">
          <button
            className="font-semibold"
            onClick={() => toggleLogin(true)}
            type="button"
          >
            Log In
          </button>
          <FancyButton
            className="px-3 py-1"
            onClick={() => toggleRegister(true)}
            type="button"
          >
            Sign up
          </FancyButton>
        </div>
      </header>

      <aside className="fixed inset-y-0 mt-14 w-80 space-y-6 overflow-hidden overflow-y-scroll p-6">
        <div className="space-y-4">
          <NavLink active href="#hot">
            🌶 Hot
          </NavLink>
          <NavLink href="#trending">🎙 Trending</NavLink>
          <NavLink href="#fresh">🍑 Fresh</NavLink>
        </div>
        <div className="space-y-3">
          <h6 className="font-semibold text-gray-400">All Categories</h6>
          {props.categories.map((category) => (
            <NavLink
              key={category.name}
              href={`#${category.name}`}
              thumbnail={category.thumbnail}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </aside>

      <main className="ml-80 mt-14 bg-black-noise bg-[length:700px] p-6">
        <div className="flex">
          <div className="flex-1">
            <PostsList
              initialData={[props.posts]}
              className="mx-auto max-w-2xl"
            />
          </div>

          <FeaturedPostsList
            featuredPosts={props.featured_posts}
            className="w-80"
          />
        </div>
      </main>
    </>
  )
}
