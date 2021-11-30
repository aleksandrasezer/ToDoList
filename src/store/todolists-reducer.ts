import {todoListsAPI, TodoListType} from '../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {serverErrorHandler} from "../utils/error-handlers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "./store";

const initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        addTodoListAC(state,action:PayloadAction<TodoListType>) {
            state.unshift({...action.payload, filter: 'all', status: 'idle'})
        },
        removeTodoListAC(state,action:PayloadAction<{id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        setTodoListsAC(state,action:PayloadAction<TodoListType[]>) {
            return action.payload.map(tl => ({...tl, filter: 'all', status: 'idle'}))
        },
        changeTodoListTitleAC(state,action:PayloadAction<{id: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title
        },
        changeTodoListFilterAC(state,action:PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        setTodoListStatusAC(state,action:PayloadAction<{id: string, status: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].status = action.payload.status
        },
    }
})

// actions
export const todoListsReducer = slice.reducer
export const {addTodoListAC,removeTodoListAC,setTodoListsAC,
    changeTodoListFilterAC,setTodoListStatusAC,changeTodoListTitleAC} = slice.actions
//thunk
export const fetchTodoListsTC = () => {
    return (dispatch: AppDispatch) => {
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
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodoListStatusAC({id: todolistId,status: 'loading'}))
        todoListsAPI.deleteTodoList(todolistId)
            .then(() => {
                dispatch(removeTodoListAC({id: todolistId}))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e) => {
                serverErrorHandler(e,dispatch)
                dispatch(setTodoListStatusAC({id: todolistId,status: 'failed'}))
            })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: AppDispatch) => {
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
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodoListStatusAC({id,status:'loading'}))
        todoListsAPI.updateTodoList(id, title)
            .then(() => {
                dispatch(changeTodoListTitleAC({id, title}))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setTodoListStatusAC({id,status: 'succeeded'}))
            })
            .catch((e) => {
                serverErrorHandler(e,dispatch)
                dispatch(setTodoListStatusAC({id,status: 'failed'}))
            })
    }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    status: RequestStatusType
    filter: FilterValuesType
}



