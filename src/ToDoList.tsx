import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type ToDoListPropsType = {
    todoListId: string
    title: string,
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void //ФУНКЦИЯ
    changeFilter: (value: FilterValuesType, todoListId: string) => void //ФУНКЦИЯ
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

function ToDoList(props: ToDoListPropsType) {
    const {filter} = props
    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todoListId)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id,newTitle,props.todoListId)
        }

        return (
            <li key={t.id} style={{paddingLeft: '0px', listStyle: 'none'}}>
                <span className = {t.isDone ? "isDone" : ""}>

                <Checkbox size={'small'}
                color={'primary'}
                    onChange={changeTaskStatus}
                    checked={t.isDone}/>

                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton aria-label="delete"
                    size={'small'}
                    onClick={removeTask}>
                         <Delete/></IconButton>
            </li>
        )
    })


    const onClickAllFilter = () => props.changeFilter('all', props.todoListId)
    const onClickActiveFilter = () => props.changeFilter('active', props.todoListId)
    const onClickCompletedFilter = () => props.changeFilter('completed', props.todoListId)
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListId)
    const addTask = (title: string) => props.addTask(title, props.todoListId)
    const changeTodoListTitleCallBack = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title}  changeTitle={changeTodoListTitleCallBack} /> {/*{props.title} */}
            <IconButton 
            onClick={onClickRemoveTodoList} 
            aria-label="delete"
            size={'small'}><Delete/></IconButton> </h3>
            <AddItemForm addItem={addTask} />
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
}

export default ToDoList;