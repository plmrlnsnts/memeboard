import Guest from '@/breeze/layouts/guest'
import LoginForm from '@/components/login-form'
import { Head } from '@inertiajs/inertia-react'

export default function Login({ status }) {
  return (
    <Guest>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <LoginForm />
    </Guest>
  )
}
