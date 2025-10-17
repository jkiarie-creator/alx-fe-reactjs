import { useQuery } from 'react-query'

const POSTS_QUERY_KEY = ['posts']

async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`)
  }
  return response.json()
}

function PostsComponent() {
  const { data, isLoading, isError, error, isFetching, refetch, dataUpdatedAt } = useQuery(POSTS_QUERY_KEY, fetchPosts, {
    staleTime: 1000 * 60, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })

  if (isLoading) {
    return <div>Loading posts...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>Posts {isFetching ? '(updating...)' : ''}</h2>
      <div style={{ margin: '8px 0' }}>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Refreshing...' : 'Refetch posts'}
        </button>
        <span style={{ marginLeft: 12, fontSize: 12 }}>
          Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
        </span>
      </div>
      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsComponent


