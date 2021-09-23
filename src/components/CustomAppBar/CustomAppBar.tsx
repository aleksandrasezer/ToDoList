import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import React, {useCallback} from "react";
import s from './CustomAppBar.module.css'
import {useDispatch} from "react-redux";
import {logOut} from "../../store/auth-reducer";


export const CustomAppBar = (props: CustomAppBarPropsType) => {

    const dispatch = useDispatch()
    const logout = useCallback(() => {
        dispatch(logOut())
    }, [dispatch])

    return <AppBar position="static" style={{background: 'green'}}>
        <Toolbar className={s.appMenu}>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <Menu/>
            </IconButton>
            <Typography variant="h5">
                {'Todo-lists'}
            </Typography>
            {props.isLoggedIn
                ? <Button color={"inherit"} variant={"outlined"} onClick={logout}>
                    Log out
                </Button>
                : <div></div>}
        </Toolbar>
    </AppBar>
}

type CustomAppBarPropsType = {
    isLoggedIn: boolean
}
