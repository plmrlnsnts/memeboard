import PostsList from '@/components/posts-list'
import ThreeColumnLayout from '@/components/three-column-layout'
import useManualScrollRestoration from '@/hooks/manual-scroll-restoration'

export default function Welcome({ posts }) {
  useManualScrollRestoration()

  return (
    <ThreeColumnLayout>
      <PostsList initialData={[posts]} />
    </ThreeColumnLayout>
  )
}
