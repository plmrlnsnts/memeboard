import { createContext } from 'react'

const AppContext = createContext({
  openLoginModal: false,
  openRegisterModal: false,
  toggleLoginModal: () => {},
  toggleRegisterModal: () => {},
})

export default AppContext
