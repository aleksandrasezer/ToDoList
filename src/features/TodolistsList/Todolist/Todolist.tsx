import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType, TodolistType} from '../../../api/todolists-api'
import {FilterValuesType} from '../../../store/todolists-reducer'
import {useDispatch} from 'react-redux'
import {fetchTasksTC} from '../../../store/tasks-reducer'

type PropsType = {
    tl: TodolistType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void

}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist called')

    const dispatch = useDispatch()

    useEffect(() => {
        const thunk = fetchTasksTC(props.tl.id)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.tl.id)
    }, [props.addTask, props.tl.id])

    const removeTodolist = () => {
        props.removeTodolist(props.tl.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.tl.id, title)
    }, [props.tl.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.tl.id), [props.tl.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.tl.id), [props.tl.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.tl.id), [props.tl.id, props.changeFilter])

    const disabled = props.tl.status === 'loading'
    const deleteButtonStyle = disabled ? {color: 'grey'} : {color: 'darkred'}

    let tasksForTodolist = props.tasks

    if (props.tl.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.tl.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.tl.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}
                        disabled={disabled}
                        style={deleteButtonStyle}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={disabled}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.tl.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                                                listStatus={props.tl.status}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.tl.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
                    disabled={disabled}
            >All
            </Button>
            <Button variant={props.tl.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}
                    disabled={disabled}
            >Active
            </Button>
            <Button variant={props.tl.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
                    disabled={disabled}
            >Completed
            </Button>
        </div>
    </div>
})


