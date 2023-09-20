import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer } from "./reducer/reducer.ts";

const store = createStore(reducer, compose(applyMiddleware(thunkMiddleware)));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
