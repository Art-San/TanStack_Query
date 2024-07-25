// React Query Tutorial V5 - Full Tanstack Query Tutorial for Beginners
// https://www.youtube.com/watch?v=3e-higRXoaM&t=924s

import './App.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { IRoot } from './product.types'

const isAuth = true
export interface Root {
  userId: number
  id: number
  title: string
  completed: boolean
}

async function getData(skip: number = 0): Promise<{ data: IRoot }> {
  return axios.get(`https://dummyjson.com/products/?limit=10&skip=${skip}`)
  // return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}

function App() {
  const [page, setPage] = useState(0)
  const { data, isLoading, isSuccess, isError, isFetched } = useQuery({
    queryKey: ['post', page],
    queryFn: () => getData(page),
    select: (data) => data.data, // избавляемся от лишней data
    enabled: isAuth, // отключает включает запросник
    retry: 1, // (0) при ошибке один запрос и успокоился, если (1) то будет 2
    refetchOnWindowFocus: false // запрос при фокусе
  })

  // isLoading срабатывает когда идет первый раз запрос
  // isFetched срабатывает когда данные обновляются из кэша

  useEffect(() => {
    if (isSuccess) console.log('получено успешно')
  }, [isSuccess])
  useEffect(() => {
    if (isError) console.log('получено ошибка')
  }, [isError])

  if (isLoading) {
    return <div className=" ">loading...</div>
  }
  if (isError) {
    return <div className=" ">Ошибка</div>
  }
  if (!data) {
    return <div className=" ">Нет данных</div>
  }

  console.log(data.products)

  return (
    <>
      <div>
        {data.products.map((product) => (
          <h3 key={product.id}>{product.title}</h3>
        ))}

        <button onClick={() => setPage((p: number) => p - 1)} disabled={!page}>
          Назад
        </button>
        <button onClick={() => setPage((p: number) => p + 1)}>Далее</button>
      </div>
    </>
  )
}

export default App
// import './App.css'
// import axios from 'axios'
// import { useEffect, useState } from 'react'

// export interface Root {
//   userId: number
//   id: number
//   title: string
//   completed: boolean
// }

// function App() {
//   const [coins, setCoins] = useState<Root>()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     async function fetchCoins() {
//       setLoading(true)
//       try {
//         const { data } = await axios.get(
//           'https://jsonplaceholder.typicode.com/todos/1'
//           // 'https://api.coinstats.app/public/v1/coins?limit=10'
//         )
//         console.log(111, data)
//         setCoins(data)
//       } catch (error) {
//         setError(true)
//       } finally {
//         setLoading(false)
//         console.log('finally')
//       }
//     }
//     fetchCoins()
//   }, [])

//   if (loading) {
//     return <div className=" ">loading...</div>
//   }
//   if (error) {
//     return <div className=" ">Ошибка</div>
//   }
//   if (!coins) {
//     return <div className=" ">Нет данных</div>
//   }

//   return (
//     <>
//       <div>
//         <h1>{coins.title}</h1>
//       </div>
//     </>
//   )
// }

// export default App
