import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type ToDoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskId: string) => void //ФУНКЦИЯ
    changeFilter: (value: FilterValuesType) => void //ФУНКЦИЯ
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

function ToDoList(props: ToDoListPropsType) {
    const {filter} = props
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li className = {t.isDone ? "isDone" : ""}>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>delete</button>
            </li>
        )
    })

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
            setError(false)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAllFilter = () => props.changeFilter('all')
    const onClickActiveFilter = () => props.changeFilter('active')
    const onClickCompletedFilter = () => props.changeFilter('completed')
    const errorMessage = error ?
        <div style={{color: "red"}}> Title is required!</div> : null
    return (
        <div>
            <h3>{props.title} </h3>
            <div>
                <input className = {error ? "error" : ""}
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}/>
                <button onClick={onClickAddTask}>+</button>
                {errorMessage}
            </div>
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