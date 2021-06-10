import React, {useCallback} from 'react';

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "../AppWithRedux";

type ToDoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
    removeTodoList: (todoListId: string) => void
}

export const ToDoList = React.memo(function (props: ToDoListPropsType) {

    console.log('todoList')



    let allTodoListTasks = props.tasks
    let tasksForTodo = allTodoListTasks

    if (props.filter === 'active') tasksForTodo = allTodoListTasks.filter(t => !t.isDone)
    if (props.filter === 'completed') tasksForTodo = allTodoListTasks.filter(t => t.isDone)

    const {filter} = props
    const tasksJSXElements = tasksForTodo.map(t => <Task key={t.id}
                                                         title={t.title}
                                                         taskId={t.id}
                                                         isDone={t.isDone}
                                                         todoListId={props.todoListId}
                                                         addTask={props.addTask}
                                                         removeTask={props.removeTask}
                                                         changeTaskStatus={props.changeTaskStatus}
                                                         changeTaskTitle={props.changeTaskTitle}/>)


    const onClickAllFilter = useCallback(() =>
        props.changeFilter('all', props.todoListId), [props.changeFilter, props.todoListId])

    const onClickActiveFilter = useCallback(() =>
        props.changeFilter('active', props.todoListId), [props.changeFilter, props.todoListId])

    const onClickCompletedFilter = useCallback(() =>
        props.changeFilter('completed', props.todoListId), [props.changeFilter, props.todoListId])

    const onClickRemoveTodoList = useCallback(() =>
        props.removeTodoList(props.todoListId), [props.removeTodoList,props.todoListId])

    const addTask = useCallback((title: string) =>
        props.addTask(title, props.todoListId), [props.addTask, props.todoListId])

    const changeTodoListTitleCallBack = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    }, [props.changeTodoListTitle,props.todoListId])

    return (
        <div>

            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitleCallBack}/>
                <IconButton
                    onClick={onClickRemoveTodoList}
                    aria-label="delete"
                    size={'small'}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {tasksJSXElements}
            </ul>

            <div>
                <Button
                    style={{marginLeft: '3px'}}
                    size={'small'}
                    variant={filter === "all" ? "outlined" : "contained"}
                    color={'primary'}
                    onClick={onClickAllFilter}>All</Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={'small'}
                    variant={filter === "active" ? "outlined" : "contained"}
                    color={'primary'}
                    onClick={onClickActiveFilter}>Active</Button>
                <Button
                    style={{marginLeft: '3px'}}
                    size={'small'}
                    variant={filter === "completed" ? "outlined" : "contained"}
                    color={'primary'}
                    onClick={onClickCompletedFilter}>Completed</Button>
            </div>
        </div>
    )
})

export default ToDoList;