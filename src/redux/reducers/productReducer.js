import {
    FETCH_PRODUCT_SUCCESS
} from '../../constants/ActionTypes';


const productReducer = (state={}, action) => {
	switch(action.type){
		case FETCH_PRODUCT_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};


export default productReducer;