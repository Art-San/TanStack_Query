/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from '@tanstack/react-query'
import './App.css'

const getData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')

  return response.json()
}

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getData
  })

  return (
    <>
      <h1>React Query</h1>

      {isLoading
        ? 'Loading...'
        : data?.length
        ? data.map((post: any) => <div key={post.id}>{post.title}</div>)
        : 'Not found'}
    </>
  )
}

export default App
