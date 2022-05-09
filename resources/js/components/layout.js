import AppHeader from './app-header'
import PageWrapper from './page-wrapper'

export default function Layout({ children }) {
  return (
    <>
      <AppHeader />
      <PageWrapper>{children}</PageWrapper>
    </>
  )
}
