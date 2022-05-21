import { usePage } from '@inertiajs/inertia-react'
import AppHeader from './app-header'
import CategoriesSidebar from './categories-sidebar'
import FeaturedPostsList from './featured-posts-list'
import PageWrapper from './page-wrapper'

export default function ThreeColumnLayout({ children }) {
  const page = usePage()

  return (
    <>
      <AppHeader />
      <CategoriesSidebar
        className="mt-14 md:w-64 lg:w-72 xl:w-80"
        categories={page.props.categories.data}
      />
      <PageWrapper className="md:ml-64 lg:ml-72 xl:ml-80">
        <div className="flex px-0 py-4 md:px-6 md:py-6">
          <div className="flex-1 xl:mr-6">
            <div className="mx-auto max-w-2xl">{children}</div>
          </div>
          <FeaturedPostsList className="hidden w-80 shrink-0 xl:block" />
        </div>
      </PageWrapper>
    </>
  )
}
