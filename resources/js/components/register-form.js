import FacebookIcon from '@/components/facebook-icon'
import GoogleIcon from '@/components/google-icon'
import { Link, useForm } from '@inertiajs/inertia-react'
import FancyButton from './fancy-button'
import Input from './input'
import OutlinedButton from './outlined-button'
import ValidationErrors from '../breeze/validation-errors'

export default function RegisterForm({ alreadyAMember }) {
  const form = useForm({
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    form.post(route('register'), {
      onError: () => form.reset('password', 'password_confirmation'),
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-center text-3xl font-semibold leading-none">
        Laugh out the world.
      </h1>

      <p className="mx-auto max-w-sm text-center text-gray-500">
        By continuing, you agree to Memeboard&apos;s{' '}
        <a href="#" className="underline">
          Terms of Service{' '}
        </a>
        and acknowledge that you&apos;ve read our{' '}
        <a href="" className="underline">
          Privacy Policy
        </a>
      </p>

      <ul className="space-y-2">
        <li>
          <OutlinedButton
            type="button"
            className="relative w-full px-3 py-2"
            aria-label="login using facebook"
          >
            <FacebookIcon className="absolute left-3 h-5 w-5" />
            <span>Continue with Facebook</span>
          </OutlinedButton>
        </li>
        <li>
          <OutlinedButton
            type="button"
            className="relative w-full px-3 py-2"
            aria-label="login using facebook"
          >
            <GoogleIcon className="absolute left-3 h-5 w-5" />
            <span>Continue with Google</span>
          </OutlinedButton>
        </li>
      </ul>

      <div className="relative flex items-center justify-center">
        <hr className="absolute inset-x-0" />
        <p className="relative bg-white px-2 text-center text-xs font-medium uppercase text-gray-500">
          Or
        </p>
      </div>

      <ValidationErrors errors={form.errors} />

      <form onSubmit={handleSubmit}>
        <div>
          <Input
            className="px-3 py-2"
            placeholder="Name"
            onChange={(e) => form.setData('name', e.target.value)}
            type="text"
            value={form.data.name}
          />
        </div>
        <div className="mt-2">
          <Input
            className="px-3 py-2"
            placeholder="Email address"
            onChange={(e) => form.setData('email', e.target.value)}
            type="text"
            value={form.data.email}
          />
        </div>
        <div className="mt-2">
          <Input
            className="px-3 py-2"
            placeholder="Password"
            onChange={(e) => form.setData('password', e.target.value)}
            type="password"
            value={form.data.password}
          />
        </div>
        <FancyButton
          type="submit"
          className="mt-4 w-full p-3"
          disabled={form.processing}
        >
          Create account
        </FancyButton>
      </form>
      <div className="text-center">
        {alreadyAMember ? (
          <button onClick={alreadyAMember} type="button" className="underline">
            Already a member? Sign in
          </button>
        ) : (
          <Link href={route('login')} className="underline">
            Already a member? Sign in
          </Link>
        )}
      </div>
    </div>
  )
}
