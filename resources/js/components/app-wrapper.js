import axios from 'axios'
import { useState } from 'react'
import { SWRConfig } from 'swr'
import AppContext from './app-context'

export default function AppWrapper({ App, ...props }) {
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
