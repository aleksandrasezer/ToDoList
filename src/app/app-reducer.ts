export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//статус loading => крутилку показываем
//статус 'idle' | 'succeeded' | 'failed'  - прячем крутилку

const initialState = {
    status: 'idle' as RequestStatusType,
    error: 'test error' as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppStatusErrorType = ReturnType<typeof setAppErrorAC>



export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const )
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const )


type ActionsType = SetAppStatusActionType | SetAppStatusErrorType