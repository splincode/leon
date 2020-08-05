import type { FunctionComponent } from 'react'
import { Post } from '@lib/blog-posts'
import Link from 'next/link'
import { DateFormat } from './date-format'

export interface PostPreviewProps {
  post: Post
}

export const PostPreview: FunctionComponent<PostPreviewProps> = ({ post, ...props }) => {
  return (
    <div>
      <div className="mb-5">
        <img src={post.coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
          <a className="hover:underline">{post.title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormat dateString={post.date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
    </div>
  )
}
