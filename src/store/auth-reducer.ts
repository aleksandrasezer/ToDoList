import {authAPI} from "../api/auth-api";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "./store";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action:PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

//thunk
export const logOut = () => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    const logout = await authAPI.logout()
    if (logout.data.resultCode === 0) {
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatusAC('succeeded'))
    } else {
        dispatch(setAppStatusAC('failed'))
    }
}
export const logIn = (values: UserLoginData) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    const login = await authAPI.login(values.email,values.password,values.rememberMe)
    if (login.data.resultCode === 0) {
        dispatch(setIsLoggedIn(true))
        dispatch(setAppStatusAC('succeeded'))
    } else {
        dispatch(setAppErrorAC(login.data.messages[0]))
        dispatch(setAppStatusAC('failed'))
    }
}

//types
export type UserLoginData = {
    email: string
    password: string
    rememberMe: boolean
}