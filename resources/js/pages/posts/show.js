import Post from '@/components/post'
import ThreeColumnLayout from '@/components/three-column-layout'

export default function ShowPost({ post }) {
  return (
    <ThreeColumnLayout>
      <Post post={post.data} />
    </ThreeColumnLayout>
  )
}
