import { useQuery } from '@tanstack/react-query'
import { postService } from './post.service'

export function usePost(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['post', id],
		queryFn: () => postService.getPostById(id),
		select: data => data.data,
		enabled: !!id,
	})

	// refetch()

	return { post: data, isLoading }
}
