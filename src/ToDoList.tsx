import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
            <li className = {t.isDone ? "isDone" : ""}>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={t.isDone}/>
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>delete</button>
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
            <button onClick={onClickRemoveTodoList}> X </button> </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className = {filter === "all" ? "activeFilter" : ""}
                    onClick={onClickAllFilter}>All</button>
                <button
                    className = {filter === "active" ? "activeFilter" : ""}
                    onClick={onClickActiveFilter}>Active</button>
                <button
                    className = {filter === "completed" ? "activeFilter" : ""}
                    onClick={onClickCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList;