import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

let reducers = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    }
)

export const store = createStore(reducers)

export type StoreType = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch