import React from 'react';
import {FilterValuesType, TaskType} from "./App";

type ToDoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void //ФУНКЦИЯ
    changeFilter: (value: FilterValuesType) => void //ФУНКЦИЯ
}

function ToDoList(props: ToDoListPropsType) {
    const tasks = props.tasks.map(t => {
        const removeTask = () => {props.removeTask(t.id)}
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>delete</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title} </h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList;