import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
	IS_FILTERED,
	CLEAR_FILTER,
    SHOW_ALERT,
	HIDE_ALERT,
	IS_LOADING,
	STOP_LOADING
} from '../../constants/ActionTypes';


const statusReducer = (state={}, action) => {
	switch(action.type){
		case IS_LOADING:
			return {...state, isLoading: true};
		case STOP_LOADING:
			return {...state, isLoading: false};
		case FETCH_PRODUCT_REQUEST:
			return {...state, isLoading: true};
		case FETCH_PRODUCT_SUCCESS:
			return {...state, isLoading: false};
		case IS_FILTERED:
			return {...state, isFiltered: action.payload};	
		case CLEAR_FILTER:
			return {...state, isFiltered: false};
		case SHOW_ALERT:
			return {...state, showAlert: action.payload};
		case HIDE_ALERT:
			return {...state, showAlert: null};
		default:
			return state;
	}
};


export default statusReducer;