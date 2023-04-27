import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type ITodoContent = Omit<ITodo, 'id'>

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => '/todos',
      transformResponse: (res: ITodo[]) => res.sort((a: ITodo, b: ITodo) => b.id - a.id),
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation({
      query: (todo: ITodoContent) => ({
        url: '/todos',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: ['Todos']
    })
  })
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} = apiSlice;