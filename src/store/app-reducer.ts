import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedIn} from "./auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//action creators
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const )
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const )
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const )

//thunk
export const authMe = () => async (dispatch: Dispatch) => {
    try {
        const response = await authAPI.authMe()
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
        } else {
            dispatch(setAppErrorAC(response.data.messages[0]))
        }
        dispatch(setIsInitializedAC(true))
    } catch (error) {
        dispatch(setIsInitializedAC(true))
    }
}

type ActionsType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>
