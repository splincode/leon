import fs from 'fs'
import { join, extname } from 'path'
import matter from 'gray-matter'
import { markdownToHtml } from './markdown2Html'

export interface Post {
  slug: string
  title: string
  date: string
  content?: string
  excerpt?: string
  coverImage?: string
}

const postsDirectory = join(process.cwd(), 'blog')

export async function getPost(file: string, withContent: boolean = false): Promise<Post> {
  const slug = file.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  if (withContent) {
    const htmlContent = await markdownToHtml(content || '')
    return {
      ...data,
      slug,
      content: htmlContent,
    } as Post
  }

  return {
    ...data,
    slug,
  } as Post
}

export async function getAllPosts(withContent: boolean = false): Promise<Post[]> {
  const postFiles = getPostFiles()

  const postPromises = postFiles.map((file) => getPost(file, withContent))
  const posts = await Promise.all(postPromises)

  return (
    posts
      // sort posts by date in descending order
      .sort((post1: Post, post2: Post) => ((post1.date ?? 0) > (post2.date ?? 0) ? -1 : 1))
  )
}

export function getPostFiles() {
  const files = fs.readdirSync(postsDirectory)
  return files.filter((file) => extname(file).toLowerCase() === '.md')
}
