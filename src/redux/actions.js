import {
	FETCH_PRODUCT_REQUEST,
	FILTER_REQUEST
} from '../constants/ActionTypes';


export const fetchProductRequest = (payload) => ({
	type: FETCH_PRODUCT_REQUEST, payload
});

export const filterRequest = (payload) => ({
	type: FILTER_REQUEST, payload
});