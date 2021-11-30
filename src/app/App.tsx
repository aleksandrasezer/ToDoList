import React, {useEffect} from 'react'
import './App.css'
import {Container, LinearProgress} from '@material-ui/core'
import {TodoLists} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {CustomAppBar} from "../components/CustomAppBar/CustomAppBar";
import {authMe} from "../store/app-reducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../components/Login/Login";
import {Loader} from "../components/Loader/Loader";

function App() {

    const {status, isInitialized} = useSelector((state: AppRootStateType) => state.app)
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])

    if (!isInitialized) {
        return <Loader/>
    }
    return (
        <div className="App">
                <CustomAppBar isLoggedIn={isLoggedIn}/>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                    <Switch>
                        <Route exact path={"/"} render={() => <TodoLists/>}/>
                        <Route path={"/login"} render={() => <Login/>}/>
                        <Route path={"/404"} render={() =>
                            <h1 style={{textAlign: 'center', color: 'darkred', paddingTop: '100px'}}>404 Error</h1>}/>
                        <Redirect from={"*"} to={"/404"}/>
                    </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}
export default App
