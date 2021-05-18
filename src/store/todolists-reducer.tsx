import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeFilterAT

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodoListTitleAT ={
    type: 'CHANGE-TODOLIST-TITLE'
    todoListId: string
    newTitle: string
}
type ChangeFilterAT = {
    type: 'CHANGE-FILTER'
    value: FilterValuesType
    todoListId: string
}


export const todoListsReducer =
    (todoLists: ToDoListType[], action: ActionType): ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case 'ADD-TODOLIST':
            const newTodoListId = v1()
            const newTodoList: ToDoListType = {id: newTodoListId, title: action.title, filter: 'all'}
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.newTitle} : tl)
        case 'CHANGE-FILTER':
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListId: todoListId }
}
export const AddTodoListAC = (title: string):AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodoListTitleAC = (todoListId: string, newTitle: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListId: todoListId, newTitle: newTitle}
}
export const ChangeFilterAC = (value: FilterValuesType, todoListId: string): ChangeFilterAT => {
    return {type: 'CHANGE-FILTER', todoListId: todoListId, value: value}
}