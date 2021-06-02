import React, {useReducer} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Paper, Toolbar, IconButton, Typography, Grid} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {
    //BLL
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

// Tasks functions:

    function removeTask(taskId: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(taskId,todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC(title,todoListId))
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId,newIsDoneValue,todoListId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatchToTasks(changeTaskTitleAC(taskId,newTitle,todoListId))
    }

// Todolists functions:

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(todoListId, newTitle))
    }

        function changeFilter(value: FilterValuesType, todoListId: string) {
            dispatchToTodoLists(changeFilterAC(value,todoListId))
        }

        function removeTodoList(todoListId: string) {
        let action = removeTodoListAC(todoListId)
            dispatchToTodoLists(action)
            dispatchToTasks(action)
        }

        function addTodoList(title: string) {
        let action = addTodoListAC(title)
            dispatchToTodoLists(action)
            dispatchToTasks(action)
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
        return (
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
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h2'}>
                        Todo-Lists
                    </Typography>

                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );

}

export default AppWithReducers;
