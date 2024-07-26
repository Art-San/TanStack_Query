import { SubmitHandler } from 'react-hook-form'
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo
} from '../services/mutations'
import { useTodos, useTodosIds } from '../services/queries'
import { useForm } from 'react-hook-form'
import { Todo } from '../types/todo'

export default function Todos() {
  const todosIdsQuery = useTodosIds()

  const todosQueries = useTodos(todosIdsQuery.data)

  const createTodoMutation = useCreateTodo()
  const updateTodoMutation = useUpdateTodo()
  const deleteTodoMutation = useDeleteTodo()

  const { register, handleSubmit } = useForm<Todo>()

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data)
  }

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true })
    }
  }

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New todo:</h4>
        <input placeholder="Title" {...register('title')} />
        <br />
        <input placeholder="Description" {...register('description')} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'Creating...' : 'Create todo'}
        />
      </form>

      <ul>
        {todosQueries &&
          todosQueries.reverse().map((item, index) => (
            <li key={index}>
              <div>Id: {item.data?.id}</div>
              <span>
                <strong>Title:</strong> {item.data?.title},{' '}
                <strong>Description:</strong> {item.data?.description}
              </span>
              <div>
                <button
                  onClick={() => handleMarkAsDoneSubmit(item.data)}
                  disabled={item.data?.checked}
                >
                  {item.data?.checked ? 'Done' : 'Mark as done'}
                </button>
                {item.data && item.data.id && (
                  <button onClick={() => handleDeleteTodo(item.data.id!)}>
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}
