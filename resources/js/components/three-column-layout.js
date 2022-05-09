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
      <CategoriesSidebar categories={page.props.categories.data} />
      <PageWrapper className="ml-80">
        <div className="flex p-6">
          <div className="mr-6 flex-1">
            <div className="mx-auto max-w-2xl">{children}</div>
          </div>
          <FeaturedPostsList
            featuredPosts={page.props.featured_posts.data}
            className="w-80 shrink-0"
          />
        </div>
      </PageWrapper>
    </>
  )
}
