import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Paper, Toolbar, IconButton, Typography, Grid} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./store/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/redux-store";

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

function AppWithRedux() {

    const tasks = useSelector((state: RootState) => state.tasks)
    const todoLists = useSelector((state: RootState) => state.todoLists)
    const dispatch = useDispatch()

  // Tasks functions:

    function removeTask(taskId: string, todoListId: string) {
        dispatch(removeTaskAC(taskId,todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title,todoListId))
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId,newIsDoneValue,todoListId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId,newTitle,todoListId))
    }

// Todolists functions:

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle))
    }

        function changeFilter(value: FilterValuesType, todoListId: string) {
            dispatch(changeFilterAC(value,todoListId))
        }

        function removeTodoList(todoListId: string) {
        let action = removeTodoListAC(todoListId)
            dispatch(action)
        }

        function addTodoList(title: string) {
        let action = addTodoListAC(title)
            dispatch(action)
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

export default AppWithRedux;
