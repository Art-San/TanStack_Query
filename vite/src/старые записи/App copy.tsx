import axios from 'axios'
import './App.css'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

// const getData = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//   return response.json()
// }

const isAuth = true
const getData = async () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts')
}

function App() {
  const { data, isLoading, isSuccess, isError, isFetched } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getData(),
    select: (data) => data.data, // избавляемся от лишней data
    enabled: isAuth // отключает включает запросник
  })

  // isLoading срабатывает когда идет первый раз запрос
  // isFetched срабатывает когда данные обновляются из кэша
  useEffect(() => {
    if (isSuccess) console.log('получено успешно')
  }, [isSuccess])
  useEffect(() => {
    if (isError) console.log('получено ошибка')
  }, [isError])

  return (
    <>
      <div className="h">getData</div>
      {isLoading
        ? 'Loading...'
        : data
        ? data.map((post: any) => <div key={post?.id}>{post?.title}</div>)
        : ' Not found'}
    </>
  )
}

export default App
