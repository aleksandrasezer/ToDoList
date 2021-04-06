import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
//BLL
    const [tasks, setTasks] =
        useState<Array<TaskType>>([
            {id: 1, title: "HTML", isDone: true},
            {id: 2, title: "CSS", isDone: true},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "Vue", isDone: false},
        ])
    const [filter, setFilter] =
        useState<"all" | "active" | "completed">("all")

    function removeTask(taskId: number) {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        //Хэй, обновись!->>
        setTasks(filteredTasks) //Реагирует только на обновление нового массива
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
                title='Tasks to Learn'
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
