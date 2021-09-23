import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../store/app-reducer";
import {Dispatch} from "redux";

export const serverErrorHandler = (error: any, dispatch: Dispatch<SetAppStatusAT | SetAppErrorAT>) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
}