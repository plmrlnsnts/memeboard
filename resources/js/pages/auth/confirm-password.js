import Button from '@/breeze/button'
import Input from '@/components/input'
import Label from '@/breeze/label'
import Guest from '@/breeze/layouts/guest'
import ValidationErrors from '@/breeze/validation-errors'
import { Head, useForm } from '@inertiajs/inertia-react'
import { useEffect } from 'react'

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value)
  }

  const submit = (e) => {
    e.preventDefault()

    post(route('password.confirm'))
  }

  return (
    <Guest>
      <Head title="Confirm Password" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <ValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <div className="mt-4">
          <Label forInput="password" value="Password" />

          <Input
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            isFocused={true}
            handleChange={onHandleChange}
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button className="ml-4" processing={processing}>
            Confirm
          </Button>
        </div>
      </form>
    </Guest>
  )
}
