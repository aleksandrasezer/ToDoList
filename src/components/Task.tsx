import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    title: string
    taskId: string
    isDone: boolean
    todoListId: string
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    console.log('tasks')

    const removeTask = useCallback(function() {
        props.removeTask(props.taskId, props.todoListId)
    }, [props])
    const changeTaskStatus = useCallback(function(e: ChangeEvent<HTMLInputElement>)
    {props.changeTaskStatus(props.taskId, e.currentTarget.checked, props.todoListId)}, [props.taskId, props.todoListId])

    const changeTaskTitle = useCallback(function(newTitle: string) {
        props.changeTaskTitle(props.taskId,newTitle,props.todoListId)}, [props.taskId, props.todoListId])


    return (
        <li key={props.taskId} style={{paddingLeft: '0px', listStyle: 'none'}}>
                <span className = {props.isDone ? "isDone" : ""}>

                <Checkbox size={'small'}
                          color={'primary'}
                          onChange={changeTaskStatus}
                          checked={props.isDone}/>

                <EditableSpan title={props.title} changeTitle={changeTaskTitle}/>
                </span>
            <IconButton aria-label="delete"
                        size={'small'}
                        onClick={removeTask}>
                <Delete/></IconButton>
        </li>
    )
})