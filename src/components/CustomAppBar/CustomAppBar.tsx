import {AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {KeyboardArrowDown} from "@material-ui/icons";
import React, {useCallback} from "react";
import s from './CustomAppBar.module.css'
import {useDispatch} from "react-redux";
import {logOut} from "../../store/auth-reducer";
import {NavLink} from "react-router-dom";


export const CustomAppBar = (props: CustomAppBarPropsType) => {

    const dispatch = useDispatch()
    const logout = useCallback(() => {
        dispatch(logOut())
    }, [dispatch])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget && e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <AppBar position="static" style={{background: 'green'}}>
        <Toolbar className={s.appMenu}>
            <div>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <KeyboardArrowDown id="basic-button"
                                   aria-controls="basic-menu"
                                   aria-haspopup="true"
                                   aria-expanded={open ? 'true' : undefined}
                                   onClick={handleClick}/>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem >
                        <NavLink to={'/'} className={s.menuLink}>{`My Planner`}</NavLink></MenuItem>
                </Menu>
            </IconButton>
            </div>
            <Typography variant="h5">
                {'My Planner'}
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
