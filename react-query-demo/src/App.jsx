import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import './App.css'
import PostsComponent from './components/PostsComponent.jsx'

const queryClient = new QueryClient()

function App() {
  const [showPosts, setShowPosts] = useState(true)

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setShowPosts((prev) => !prev)}>
          {showPosts ? 'Hide Posts (navigate away)' : 'Show Posts (navigate back)'}
        </button>
      </div>
      {showPosts ? (
        <PostsComponent />
      ) : (
        <div>You're on a different view. Toggle back to see cache in action.</div>
      )}
    </QueryClientProvider>
  )
}

export default App
