import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { postService } from './post.service'
import { IPost } from './post.types'

const initialData: { data: IPost[] } = {
  data: [
    {
      body: 'Initial body',
      id: 0,
      title: 'Initial title',
      userId: 0
    }
  ]
}

export function usePosts(isEnabled: boolean) {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => postService.getPosts(),
    select: (data) => data.data,
    enabled: isEnabled,
    initialData,
    staleTime: 1000
  })
  console.log(123, data)
  useEffect(() => {
    if (isSuccess) console.log('Data fetched successfully')
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) console.log('Error fetching data')
  }, [isError])

  return { data, isLoading, isSuccess, isError }
}
