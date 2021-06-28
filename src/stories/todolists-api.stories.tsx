import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodo().then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodo("Sasha's list").then( (res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '49672883-5684-497b-94e4-7ff75e641522';
        todolistAPI.deleteTodo(todolistId).then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3d8e2dc8-9ad2-4200-9199-4886d218dded'
        todolistAPI.updateTodoTitle(todolistId, 'THIS IS NEW TITLE')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

