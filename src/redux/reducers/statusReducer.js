import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    IS_FILTERED,
    SHOW_ALERT,
    HIDE_ALERT
} from '../../constants/ActionTypes';


const statusReducer = (state={}, action) => {
	switch(action.type){
		case FETCH_PRODUCT_REQUEST:
			return {...state, isLoading: true};
		case FETCH_PRODUCT_SUCCESS:
			return {...state, isLoading: false};
		case IS_FILTERED:
			return {...state, isFiltered: action.payload};	
		case SHOW_ALERT:
			return {...state, showAlert: action.payload};
		case HIDE_ALERT:
			return {...state, showAlert: null};
		default:
			return state;
	}
};


export default statusReducer;