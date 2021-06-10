
import {v1} from "uuid";
import { FilterValuesType, ToDoListType } from "../AppWithRedux";

export type TodoListsActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeFilterAT

export type RemoveTodoListAT = {
    type: 'REMOVE_TODOLIST'
    todoListId: string
}
export type AddTodoListAT = {
    type: 'ADD_TODOLIST'
    title: string
    todoListId: string
}
type ChangeTodoListTitleAT ={
    type: 'CHANGE_TODOLIST_TITLE'
    todoListId: string
    newTitle: string
}
type ChangeFilterAT = {
    type: 'CHANGE_FILTER'
    value: FilterValuesType
    todoListId: string
}

export const todoListId_1 = v1()
export const todoListId_2 = v1()

const initialState: ToDoListType[] = [
    {id: todoListId_1, title: "What to learn", filter: 'all'},
    {id: todoListId_2, title: "What to buy", filter: 'all'}
]


export const todoListsReducer =
    (todoLists = initialState, action: TodoListsActionType): ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case 'ADD_TODOLIST':
            return [...todoLists, {id: action.todoListId, title: action.title, filter: 'all'}]
        case 'CHANGE_TODOLIST_TITLE':
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.newTitle} : tl)
        case 'CHANGE_FILTER':
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)
        default:
            return todoLists
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return {type: 'REMOVE_TODOLIST', todoListId: todoListId}
}
export const addTodoListAC = (title: string):AddTodoListAT => {
    return {type: 'ADD_TODOLIST', title: title, todoListId: v1()}
}
export const changeTodoListTitleAC = (todoListId: string, newTitle: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE_TODOLIST_TITLE', todoListId: todoListId, newTitle: newTitle}
}
export const changeFilterAC = (value: FilterValuesType, todoListId: string): ChangeFilterAT => {
    return {type: 'CHANGE_FILTER', todoListId: todoListId, value: value}
}