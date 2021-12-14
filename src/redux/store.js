import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//import reducers
import controlsReducer from "./reducers/controlsReducer";
import studentReducer from "./reducers/studentReducer";

const initialState = {};
const middleWare = [thunk];

const reducers = combineReducers({
  //implement reducers
  controls: controlsReducer,
  student: studentReducer

});

const composeEnhancer =
  typeof window == "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const enhancer = composeEnhancer(applyMiddleware(...middleWare));
const store = createStore(reducers, initialState, enhancer);

export default store;
