import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";


const initialState = {
    isLoggedIn: false
}

type InitStateType = typeof initialState

export const authReducer = (state: InitStateType = initialState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

//action creators
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)

//thunk
export const logOut = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const logout = await authAPI.logout()
    if (logout.data.resultCode === 0) {
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatusAC('succeeded'))
    } else {
        dispatch(setAppStatusAC('failed'))
    }
}
export const logIn = (values: UserLoginData) => async (dispatch: Dispatch) => {
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
type ActionsType = ReturnType<typeof setIsLoggedIn>

export type UserLoginData = {
    email: string
    password: string
    rememberMe: boolean
}