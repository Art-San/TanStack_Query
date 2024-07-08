import './App.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const isAuth = true
export interface Root {
  userId: number
  id: number
  title: string
  completed: boolean
}

const getData = async () => {
  return axios.get('https://dummyjson.com/products/?limit=10&skip=0')
  // return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}

function App() {
  const { data, isLoading, isSuccess, isError, isFetched } = useQuery({
    queryKey: ['post'],
    queryFn: () => getData(),
    select: (data) => data.data, // избавляемся от лишней data
    enabled: isAuth, // отключает включает запросник
    retry: 0
  })

  // isLoading срабатывает когда идет первый раз запрос
  // isFetched срабатывает когда данные обновляются из кэша
  console.log(data)
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

  return (
    <>
      <div>{/* <h1>{data.title}</h1> */}</div>
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
