import React, {useCallback} from 'react';
import './App.css';
import ToDoList from "./components/ToDoList";
import {AddItemForm} from "./components/AddItemForm";
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

    const todoLists = useSelector((state: RootState) => state.todoLists)
    const tasks = useSelector((state: RootState) => state.tasks)
    const dispatch = useDispatch()

  // Tasks functions:
    const removeTask = useCallback(function(taskId: string, todoListId: string) {
        dispatch(removeTaskAC(taskId,todoListId))
    }, [dispatch])

    const addTask = useCallback(function(title: string, todoListId: string) {
        dispatch(addTaskAC(title,todoListId))
    }, [dispatch])

    const changeTaskStatus = useCallback(function(taskId: string, newIsDoneValue: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId,newIsDoneValue,todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback(function(taskId: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId,newTitle,todoListId))
    }, [dispatch])

// Todolists functions:

    const changeTodoListTitle = useCallback(function(todoListId: string, newTitle: string) {
        dispatch(changeTodoListTitleAC(todoListId, newTitle))
    }, [dispatch])

    const  changeFilter = useCallback(function(value: FilterValuesType, todoListId: string) {
            dispatch(changeFilterAC(value,todoListId))
        }, [dispatch])

    const  removeTodoList = useCallback(function(todoListId: string) {
        let action = removeTodoListAC(todoListId)
            dispatch(action)
        }, [dispatch])

    const  addTodoList = useCallback(function(title: string) {
        let action = addTodoListAC(title)
            dispatch(action)
        }, [dispatch])

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
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <ToDoList
                                        todoListId={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        addTask={addTask}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );

}

export default AppWithRedux;