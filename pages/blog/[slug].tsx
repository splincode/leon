import { FunctionComponent } from 'react'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { Post, getPost, getAllPosts } from '@lib/blog-posts'
import { useRouter } from 'next/router'
import { Layout } from '@components/layout'
import { GetStaticProps, GetStaticPaths } from 'next'
import { markdownToHtml } from '@lib/markdown2Html'
import { ParsedUrlQuery } from 'querystring'

export interface PostPageProps {
  post?: Post
  morePosts?: Post[]
  preview?: boolean
}

const PostPage: FunctionComponent<PostPageProps> = ({ post, morePosts, preview }) => {
  const router = useRouter()
  if (!post) {
    //if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout pageTitle={post.title} preview={preview}>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <article className="mb-32">
          <Head>
            <meta property="og:image" content={post.coverImage} />
          </Head>
          {/* <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} author={post.author} /> */}
          <div className="max-w-2xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: post.content ?? 'Post has no content' }} />
          </div>
        </article>
      )}
    </Layout>
  )
}
export default PostPage

export interface PathParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<PostPageProps, PathParams> = async (context) => {
  const slug = context.params?.slug
  const post = slug ? await getPost(slug, true) : undefined
  const content = await markdownToHtml(post?.content ?? '')

  return {
    props: {
      post: post && {
        ...post,
        content,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const posts = await getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
