import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
//BLL
    const [tasks, setTasks] =
        useState<Array<TaskType>>([
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Vue", isDone: false},
        ])
    const [filter, setFilter] =
        useState<"all" | "active" | "completed">("all")

    function removeTask(taskId: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        //Хэй, обновись!->>
        setTasks(filteredTasks) //Реагирует только на обновление нового массива
    }
    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title, //title: title
            isDone: false
        }
        setTasks([newTask,...tasks])
    }
    function changeTaskStatus(taskId: string, newIsDoneValue: boolean) {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function getTasksForTodoList() {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

//UI
    return (
        <div className="App">
            <ToDoList
                changeTaskStatus={changeTaskStatus}
                filter={filter}
                title='Tasks to Learn'
                tasks={getTasksForTodoList()}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
        </div>
    );

}

export default App;
