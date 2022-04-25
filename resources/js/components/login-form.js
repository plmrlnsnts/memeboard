import FacebookIcon from '@/components/facebook-icon'
import GoogleIcon from '@/components/google-icon'
import { Link, useForm } from '@inertiajs/inertia-react'
import FancyButton from './fancy-button'
import Input from './input'
import OutlinedButton from './outlined-button'
import ValidationErrors from '../breeze/validation-errors'

export default function LoginForm() {
  const form = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    form.post(route('login'), {
      onError: () => form.reset('password'),
    })
  }

  return (
    <div className="space-y-6">
      <ValidationErrors errors={form.errors} />
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
            aria-label="login using google"
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
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            className="px-3 py-2"
            placeholder="Username or email address"
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
          Log in
        </FancyButton>
      </form>
      <div className="text-center">
        <Link href={route('password.request')} className="underline">
          Trouble signing in?
        </Link>
      </div>
    </div>
  )
}
