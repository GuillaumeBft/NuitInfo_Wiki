import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import monitorReducerEnhancer from './enhancers/monitorReducerEnhancer';
import loggerMiddleware from './middleware/logger';
import UserReducer from './Reducers/UserReducer';
    
const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)

export default createStore(UserReducer, undefined, composedEnhancers)