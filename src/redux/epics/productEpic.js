import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_ERROR,
    FETCH_PRODUCT_CANCEL,
    IS_FILTERED
} from '../../constants/ActionTypes';
import {
    fetchAPI
} from '../../utils/ApiUtils';
import { defaultFilter } from '../reducers/filterReducer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';


const productEpic = (action$, store) =>
	action$.ofType(FETCH_PRODUCT_REQUEST)
	.switchMap(action => 
		fetchAPI(action.payload)
		.flatMap(
			res => {
				let filter = store.getState().filter;
				let isFiltered = false;
				for(let x in filter){
					if(defaultFilter[x] === undefined && filter[x] !== ''){
						isFiltered = true;	   
					}
				}
				return [
					{type: FETCH_PRODUCT_SUCCESS, payload: res},
					{type: IS_FILTERED, payload: isFiltered}
				];
			}
		)
		.catch(
			err => [{type: FETCH_PRODUCT_ERROR}]
		)
	)
    .takeUntil(action$.ofType(FETCH_PRODUCT_CANCEL));


export default productEpic;