import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListTC, TodoListDomainType,
} from '../../store/todolists-reducer'
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from '../../store/tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Redirect} from "react-router-dom";

export const TodoLists: React.FC = () => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        const thunk = fetchTodoListsTC()
        dispatch(thunk)
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [dispatch,])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback(function (filter: FilterValuesType, todolistId: string) {
        const action = changeTodoListFilterAC({id: todolistId, filter})
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodoListTC(id)
        dispatch(thunk)
    }, [dispatch])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodoListTitleTC(id, title)
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodoListTC(title)
        dispatch(thunk)
    }, [dispatch])

    if(!isLoggedIn) {
        return <Redirect to={"/login"} />
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist} disabled={false}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper elevation={10}
                               style={{padding: '10px', backgroundColor: 'rgba(255,255,255,0.6)'}}>
                            <Todolist
                                tl={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
