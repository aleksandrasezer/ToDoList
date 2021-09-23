import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListsActionType,
    setTodoListStatusAC
} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from './store'
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {serverErrorHandler} from "../utils/error-handlers";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todoListsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            serverErrorHandler(e, dispatch)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodoListStatusAC(todolistId, 'loading'))
    todoListsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodoListStatusAC(todolistId, 'succeeded'))
        })
        .catch((e) => {
            serverErrorHandler(e, dispatch)
            dispatch(setTodoListStatusAC(todolistId, 'failed'))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodoListStatusAC(todolistId, 'loading'))
    todoListsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setTodoListStatusAC(todolistId, 'succeeded'))
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            } else {
                if (res.data.messages.length) {
                    serverErrorHandler(res.data.messages[0], dispatch)
                    dispatch(setTodoListStatusAC(todolistId, 'failed'))
                }
            }
        })
        .catch((e) => {
            serverErrorHandler(e,dispatch)
            dispatch(setTodoListStatusAC(todolistId, 'failed'))
        })
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodoListStatusAC(todolistId, 'loading'))
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
            ...domainModel
        }

        todoListsAPI.updateTask(todolistId, taskId, apiModel)
            .then(() => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
            .catch((e) => {
                serverErrorHandler(e, dispatch)
            })
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setTodoListStatusAC(todolistId, 'succeeded'))
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
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setTodoListStatusAC>
