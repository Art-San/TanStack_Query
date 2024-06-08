import './App.css'
import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { IPost } from './post.types'
import { usePosts } from './usePosts'

const isAuth = true
function App() {
  const { data, isLoading } = usePosts(isAuth)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['add post'],
    mutationFn: async (newPost: Omit<IPost, 'id'>) =>
      axios.post('https://jsonplaceholder.typicode.com/posts', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  // если  mutate то react-query сам обрабатывает ошибки
  // если  mutateAsync то самому придется обрабатывает ошибки

  // это глобальные штуки
  // const isFetching = useIsFetching()
  // const isMutating = useIsMutating()
  return (
    <>
      <h1>React Query</h1>

      <button
        onClick={() => {
          mutate({
            body: 'New body',
            title: 'New title',
            userId: 1
          })
        }}
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Create'}
      </button>

      <div className="">
        <div className="h">getData</div>
        {isLoading
          ? 'Loading...'
          : data
          ? data.map((post) => <div key={post?.id}>{post?.title}</div>)
          : ' Not found'}
      </div>
    </>
  )
}

export default App
