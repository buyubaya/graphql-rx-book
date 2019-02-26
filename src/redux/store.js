import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
// REDUCERS
import productReducer from './reducers/productReducer';
import filterReducer from './reducers/filterReducer';
import statusReducer from './reducers/statusReducer';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';
// EPICS
import productEpic from './epics/productEpic';
import filterEpic from './epics/filterEpic';
import clearFilterEpic from './epics/clearFilterEpic';


const reducers = combineReducers({
    product: productReducer, 
    status: statusReducer, 
    filter: filterReducer,
    cart: cartReducer,
    user: userReducer
});


const epics = combineEpics(productEpic, filterEpic, clearFilterEpic);
const rootEpic = createEpicMiddleware(epics);
const store = createStore(reducers, applyMiddleware(rootEpic));


export default store;