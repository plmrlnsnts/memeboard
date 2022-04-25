import Button from '@/breeze/button'
import Guest from '@/breeze/layouts/guest'
import { Head, Link, useForm } from '@inertiajs/inertia-react'

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm()

  const submit = (e) => {
    e.preventDefault()

    post(route('verification.send'))
  }

  return (
    <Guest>
      <Head title="Email Verification" />

      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn&apos;t receive the email, we will gladly send you another.
      </div>

      {status === 'verification-link-sent' && (
        <div className="mb-4 text-sm font-medium text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <form onSubmit={submit}>
        <div className="mt-4 flex items-center justify-between">
          <Button processing={processing}>Resend Verification Email</Button>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="text-sm text-gray-600 underline hover:text-gray-900"
          >
            Log Out
          </Link>
        </div>
      </form>
    </Guest>
  )
}