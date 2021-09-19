import React, {useEffect} from 'react'
import './App.css'
import {Container, LinearProgress} from '@material-ui/core'
import {TodoLists} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {CustomAppBar} from "../components/CustomAppBar/CustomAppBar";
import {authMe} from "./app-reducer";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../components/Login/Login";

function App() {

    const {status, isInitialized} = useSelector((state: AppRootStateType) => state.app)
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, [])

    if (!isInitialized) {
        return <LinearProgress color="secondary"/>
    } else {
        return (
            <div className="App">

                <CustomAppBar isLoggedIn={isLoggedIn}/>
                {status === 'loading' && <LinearProgress color="secondary"/>}

                <Container fixed>
                    <HashRouter>
                        <Switch>
                            <Route exact path={"/"} render={() => <TodoLists/>}/>
                            <Route path={"/login"} render={() => <Login />}/>
                            <Route path={"/404"} render={() => <h1>404 залупа</h1>}/>
                            <Redirect from={"*"} to={"/404"}/>
                        </Switch>
                    </HashRouter>
                </Container>

                <ErrorSnackbar/>

            </div>
        )
    }
}

export default App
