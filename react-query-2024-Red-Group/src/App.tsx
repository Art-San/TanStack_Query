/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import './App.css'
import { IPost } from './post.types'

function App() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['add post'],
		mutationFn: async (newPost: Omit<IPost, 'id'>) =>
			axios.post('https://jsonplaceholder.typicode.com/posts', newPost),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
		},
	})

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
						userId: 1,
					})
				}}
				disabled={isPending}
			>
				{isPending ? 'Loading...' : 'Create'}
			</button>
		</>
	)
}

export default App
