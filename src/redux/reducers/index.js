import { combineReducers } from 'redux'
import burgerReducer from './burgerReducer';
import orderReducer from './orderReducer';
import signupLoginReducer from './signupLoginReducer';

const reducers = combineReducers({
    burgerReducer,
    orderReducer,
    signupLoginReducer,
});

export default reducers