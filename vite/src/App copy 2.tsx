import './App.css'
import { usePost } from './usePostById'
import { useQueryClient } from '@tanstack/react-query'
import { usePosts } from './usePosts'

const isAuth = true

function App() {
  const { data, isLoading } = usePosts(isAuth)
  const { post } = usePost(1)

  const queryClient = useQueryClient()

  return (
    <>
      <div className="h">getData</div>
      <button
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ['posts'] })
        }}
      >
        Обновить данные
      </button>
      {isLoading
        ? 'Loading...'
        : data
        ? data.map((post) => <div key={post?.id}>{post?.title}</div>)
        : ' Not found'}
    </>
  )
}

export default App
