import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, todoListId_1, todoListId_2} from "./todolists-reducer";

export type TasksActionType = RemoveTaskAT | AddTaskAT |
    ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT |
    RemoveTodoListAT

type RemoveTaskAT = {
    type: 'REMOVE_TASK'
    taskId: string
    todoListId: string
}
type AddTaskAT = {
    type: 'ADD_TASK'
    newTitle: string
    todoListId: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    newIsDoneValue: boolean
    todoListId: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    newTitle: string
    todoListId: string

}

let initialState: TaskStateType = {
    [todoListId_1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ],
    [todoListId_2]: [
        {id: v1(), title: "milk", isDone: true},
        {id: v1(), title: "bread", isDone: false},
        {id: v1(), title: "eggs", isDone: false},
    ]}



export const tasksReducer = (state = initialState, action: TasksActionType): TaskStateType => {
        switch (action.type) {
            case 'REMOVE_TASK':
                return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}

            case 'ADD_TASK':
                const newTask: TaskType = {
                    id: v1(),
                    title: action.newTitle,
                    isDone: false
                }
                return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}

            case 'CHANGE_TASK_STATUS':
                return {...state, [action.todoListId]: state[action.todoListId].map(t =>
                        t.id === action.taskId ? {...t, isDone: action.newIsDoneValue} : t)}

            case 'CHANGE_TASK_TITLE':
                return {...state, [action.todoListId]: state[action.todoListId].map(t =>
                        t.id === action.taskId ? {...t, title: action.newTitle} : t)}

            case 'ADD_TODOLIST':
                return {...state, [action.todoListId]: []}

            case 'REMOVE_TODOLIST':
                const stateCopy = {...state}
                delete stateCopy[action.todoListId]
                return stateCopy

            default:
                return state
        }
    }

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskAT => {
    return {
        type: 'REMOVE_TASK',
        taskId,
        todoListId
    }
}
export const addTaskAC = (newTitle: string, todoListId: string): AddTaskAT => {
    return {
        type: 'ADD_TASK',
        newTitle,
        todoListId
    }
}
export const changeTaskStatusAC = (taskId: string, newIsDoneValue: boolean, todoListId: string): ChangeTaskStatusAT => {
    return {
        type: 'CHANGE_TASK_STATUS',
        taskId,
        newIsDoneValue,
        todoListId
    }
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleAT => {
    return {
        type: 'CHANGE_TASK_TITLE',
        taskId,
        newTitle: newTitle,
        todoListId
    }
}

