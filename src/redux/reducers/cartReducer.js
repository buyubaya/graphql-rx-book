import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EDIT_CART_ITEM,
    UPDATE_CART,
    DESTROY_CART
} from '../../constants/ActionTypes';


const cartReducer = (state={list: []}, action) => {
	switch(action.type){
        case ADD_TO_CART:
            let newState = {...state};
            newState.list.push(action.payload);
			return newState;
        case REMOVE_FROM_CART:
            return {...state, list: state.list.filter(item => item._id !== action.payload._id)};
        case EDIT_CART_ITEM:
            let newList = [...state.list];
            if(action.payload.qty > 0){
                newList = newList.map(item => {
                    if(item._id === action.payload._id){
                        item.qty = action.payload.qty;
                    }
                    return item;
                });
            }
            else {
                newList = newList.filter(item => item._id !== action.payload._id);
            }

            return {...state, list: newList};
        case UPDATE_CART:
            return state;  
        case DESTROY_CART:
			return state; 
		default:
			return state;
	}
};


export default cartReducer;