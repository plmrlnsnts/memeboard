import Guest from '@/breeze/layouts/guest'
import RegisterForm from '@/components/register-form'
import { Head } from '@inertiajs/inertia-react'

export default function Register() {
  return (
    <Guest>
      <Head title="Register" />
      <RegisterForm />
    </Guest>
  )
}
