import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    todoListId: string
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    console.log('tasks')

    const removeTask = useCallback(function() {
        props.removeTask(props.task.id, props.todoListId)
    }, [props])
    const changeTaskStatus = useCallback(function(e: ChangeEvent<HTMLInputElement>)
    {props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)}, [props.task.id, props.todoListId])

    const changeTaskTitle = useCallback(function(newTitle: string) {
        props.changeTaskTitle(props.task.id,newTitle,props.todoListId)}, [props.task.id, props.todoListId])


    return (
        <li key={props.task.id} style={{paddingLeft: '0px', listStyle: 'none'}}>
                <span className = {props.task.isDone ? "isDone" : ""}>

                <Checkbox size={'small'}
                          color={'primary'}
                          onChange={changeTaskStatus}
                          checked={props.task.isDone}/>

                <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
                </span>
            <IconButton aria-label="delete"
                        size={'small'}
                        onClick={removeTask}>
                <Delete/></IconButton>
        </li>
    )
})