import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { createReader } from '@keystatic/core/reader'

import keystaticConfig from '../../keystatic.config'

export async function loader() {
  // 1. Create a reader
  const reader = createReader(process.cwd(), keystaticConfig)
  // 2. Read the "Posts" collection
  const posts = await reader.collections.posts.all()
  return json({ posts })
}

export default function Page() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <>
      <h1>Remix + Keystatic</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        Visit the <Link to="/keystatic">Keystatic Admin UI</Link>.
      </p>
    </>
  )
}
