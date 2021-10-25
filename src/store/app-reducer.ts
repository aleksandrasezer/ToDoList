import {authAPI} from "../api/auth-api";
import {setIsLoggedIn} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "./store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state,action:PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
        setIsInitializedAC(state,action:PayloadAction<boolean>) {
            state.isInitialized = action.payload
        },
        setAppErrorAC(state,action:PayloadAction<string|null>) {
            state.error = action.payload
        },
    }
})

//action creators
export const appReducer = slice.reducer
export const {setAppStatusAC, setIsInitializedAC, setAppErrorAC} = slice.actions
//thunk
export const authMe = () => async (dispatch: AppDispatch) => {
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

//types for error handler
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
//type for test
export type InitAppStateType = typeof initialState

