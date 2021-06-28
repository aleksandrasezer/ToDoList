import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'fd7ee122-ff59-4cee-b5b0-6226ee5b433c'
    }
})

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T= {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}

export const todolistAPI = {
    getTodo() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo(newTitle: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title: newTitle})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)

    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
}
