import React, {useEffect, useState} from 'react'
import {tasksAPI, todolistAPI} from "../api/todolist-api";
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

/*export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodo('Books to read').then( (res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}*/

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f287f2dd-a17c-4914-ae31-eae20e8294e2';
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

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ea3378d8-3033-47b0-b098-9ab662a9ac76'
        tasksAPI.getTasks(todolistId).then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

/*export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ea3378d8-3033-47b0-b098-9ab662a9ac76'
        tasksAPI.createTask(todolistId, 'Black Panther').then(resp => setState(resp.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}*/

