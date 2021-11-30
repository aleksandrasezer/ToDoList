import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from './todolists-reducer';
import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;
