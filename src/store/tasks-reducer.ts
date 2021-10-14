import {
    addTodoListAC, removeTodoListAC, setTodoListsAC,
    setTodoListStatusAC
} from './todolists-reducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todoListsAPI,
     UpdateTaskModelType
} from '../api/todolists-api'
import {AppDispatch, AppRootStateType} from './store'
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {serverErrorHandler} from "../utils/error-handlers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.forEach(tl => state[tl.id] = [])
        })
    }
})

// actions
export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC({tasks, todolistId})
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            serverErrorHandler(e, dispatch)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodoListStatusAC({id: todolistId, status: 'loading'}))
    todoListsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC({taskId, todolistId}))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodoListStatusAC({id: todolistId, status: 'succeeded'}))
        })
        .catch((e) => {
            serverErrorHandler(e, dispatch)
            dispatch(setTodoListStatusAC({id: todolistId, status: 'failed'}))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodoListStatusAC({id: todolistId, status: 'loading'}))
    todoListsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setTodoListStatusAC({id: todolistId, status: 'succeeded'}))
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            } else {
                if (res.data.messages.length) {
                    serverErrorHandler(res.data.messages[0], dispatch)
                    dispatch(setTodoListStatusAC({id: todolistId, status: 'failed'}))
                }
            }
        })
        .catch((e) => {
            serverErrorHandler(e, dispatch)
            dispatch(setTodoListStatusAC({id: todolistId, status: 'failed'}))
        })
}


export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodoListStatusAC({id: todolistId, status: 'loading'}))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            dispatch(setAppErrorAC('task not found'))
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model
        }

        todoListsAPI.updateTask(todolistId, taskId, apiModel)
            .then(() => {
                const action = updateTaskAC({taskId, model, todolistId})
                dispatch(action)
            })
            .catch((e) => {
                serverErrorHandler(e, dispatch)
            })
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setTodoListStatusAC({id: todolistId, status: 'succeeded'}))
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
