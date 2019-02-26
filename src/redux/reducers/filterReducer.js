import {
    IS_FILTERED,
    CLEAR_FILTER
} from '../../constants/ActionTypes';


export const defaultFilter = {
	limit: 8,
	page: 1
};

const filterReducer = (state={...defaultFilter}, action) => {
	switch(action.type){
		case IS_FILTERED:
			return (action.payload) ? Object.assign({...state}, action.payload) : {...state};  
		case CLEAR_FILTER:
			return defaultFilter;
		default:
			return state;
	}
};


export default filterReducer;