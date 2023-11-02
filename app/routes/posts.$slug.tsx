// app/routes/posts.$slug.tsx
import { createReader } from '@keystatic/core/reader'
import { DocumentRenderer } from '@keystatic/core/renderer'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import keystaticConfig from '../../keystatic.config'

export async function loader({ params }: LoaderFunctionArgs) {
  const reader = createReader(process.cwd(), keystaticConfig)
  const slug = params.slug
  if (!slug) throw json('Not Found', { status: 404 })
  const post = await reader.collections.posts.read(slug, { resolveLinkedFiles: true })
  if (!post) throw json('Not Found', { status: 404 })
  return json({ post })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>{post.title}</h1>
      <DocumentRenderer document={post.content} />
    </>
  )
}
