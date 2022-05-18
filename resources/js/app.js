require('./bootstrap')

import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import axios from 'axios'
import { useState } from 'react'
import { render } from 'react-dom'
import { SWRConfig } from 'swr'
import AppContext from './components/app-context'

const appName = 'Memeboard'

function AppWrapper({ App, ...props }) {
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const [openLoginModal, toggleLoginModal] = useState(false)
  const [openRegisterModal, toggleRegisterModal] = useState(false)

  return (
    <SWRConfig value={{ fetcher }}>
      <AppContext.Provider
        value={{
          openLoginModal,
          openRegisterModal,
          toggleLoginModal,
          toggleRegisterModal,
        }}
      >
        <App {...props} />
      </AppContext.Provider>
    </SWRConfig>
  )
}

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => require(`./pages/${name}`),
  setup({ el, App, props }) {
    return render(<AppWrapper App={App} {...props} />, el)
  },
})

InertiaProgress.init({ color: '#4B5563' })
