import React from 'react'
import './App.css'
import {AppBar, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>((state: AppRootStateType) => state.app.status)

    return (
        <div className="App">

            <AppBar position="static" style={{ background: 'green' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        {'Todo-lists'}
                    </Typography>
                </Toolbar>
            </AppBar>

            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                <TodolistsList/>
            </Container>

            <ErrorSnackbar />

        </div>
    )
}

export default App
