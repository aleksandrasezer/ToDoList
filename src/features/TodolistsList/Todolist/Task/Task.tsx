import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import {RequestStatusType} from "../../../../store/app-reducer";
import s from '../Todolist.module.css'

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);
    const disabled = props.listStatus === 'loading'
    const deleteButtonStyle = disabled ? {color: 'grey'} : {color: 'darkred'}
    const checkboxStyle = disabled ? {color: 'grey'} : {color: 'green'}

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={s.taskContainer}>
        <span>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                style={checkboxStyle}
                onChange={onChangeHandler}
                disabled={disabled}
            />

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        </span>
        <IconButton onClick={onClickHandler}
                    disabled={disabled}
                    style={deleteButtonStyle}>
            <Delete/>
        </IconButton>
    </div>
})

//types
type TaskPropsType = {
    task: TaskType
    listStatus: RequestStatusType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
