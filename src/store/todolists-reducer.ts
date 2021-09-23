import {todoListsAPI, TodoListType} from '../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {serverErrorHandler} from "../utils/error-handlers";

const initialState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLIST-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, status: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

// actions
export const removeTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodoListAC = (todolist: TodoListType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodoListStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'SET-TODOLIST-STATUS',
    id,
    status
} as const)
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)

// thunks
export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e) => {
                serverErrorHandler(e,dispatch)
            })
    }
}
export const removeTodoListTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodoListStatusAC(todolistId,'loading'))
        todoListsAPI.deleteTodoList(todolistId)
            .then(() => {
                dispatch(removeTodoListAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setTodoListStatusAC(todolistId,'succeeded'))
            })
            .catch((e) => {
                serverErrorHandler(e,dispatch)
                dispatch(setTodoListStatusAC(todolistId,'failed'))
            })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.createTodoList(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e) => {
                serverErrorHandler(e,dispatch)
            })
    }
}
export const changeTodoListTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodoListStatusAC(id,'loading'))
        todoListsAPI.updateTodoList(id, title)
            .then(() => {
                dispatch(changeTodoListTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setTodoListStatusAC(id,'succeeded'))
            })
            .catch((e) => {
                serverErrorHandler(e,dispatch)
                dispatch(setTodoListStatusAC(id,'failed'))
            })
    }
}

// types
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type SetTodoStatusAT = ReturnType<typeof setTodoListStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
type ActionsType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodoListsActionType
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | SetTodoStatusAT


