import { FunctionComponent } from 'react'
import { Layout } from '@components/layout'
import { getAllPosts, Post } from '@lib/blog-posts'
import { PostPreview } from '@components/post-preview'

export interface IndexPageProps {
  posts: Post[]
}

const IndexPage: FunctionComponent<IndexPageProps> = ({ posts }) => {
  return (
    <Layout pageTitle="blog">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
          {posts.map((post) => (
            <PostPreview key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </Layout>
  )
}
export default IndexPage

export const getStaticProps = async () => {
  const posts = await getAllPosts()
  return {
    props: { posts },
  }
}
