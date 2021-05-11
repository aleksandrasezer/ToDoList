import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import { AppBar, Container, Paper, Toolbar, IconButton, Typography, Grid} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    //BLL
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<ToDoListType[]>([
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: false},
            {id: v1(), title: "eggs", isDone: false},
        ]
    })

    function removeTask(taskId: string, todoListId: string) {
       setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }
    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {
            id: v1(),
            title, //title: title
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask,...tasks[todoListId]]})
    }
    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListId: string) {
        tasks[todoListId] = tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks})
    }
    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        tasks[todoListId] = tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        setTasks({...tasks})
    }
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
setTodoLists((todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl)))
    }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }
    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId] // удалили массив--> удалили и таски из него, чтобы не болтались

    }
    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: ToDoListType = {id: newTodoListId, title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }

    //UI
    function getTasksForTodoList(todoLists: ToDoListType) {
        switch (todoLists.filter) {
            case "active":
                return tasks[todoLists.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoLists.id].filter(t => t.isDone)
            default:
                return tasks[todoLists.id]
        }
    }
    const todoListsComponents = todoLists.map(tl => {
        return(
            <Grid item key={tl.id}>
            <Paper elevation={3} style={{padding: '20px'}}>
            <ToDoList
                todoListId={tl.id}
                title={tl.title}
                tasks={getTasksForTodoList(tl)}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}/>
                </Paper>
                </Grid>
        )
    })

//UI
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton color={'inherit'}>
                        <Menu />
                    </IconButton>
                    <Typography variant={'h2'}>
                        Todo-Lists
                    </Typography>
                    
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList} /> 
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}    
                </Grid>
            </Container>
        </div>
    );

}

export default App;
