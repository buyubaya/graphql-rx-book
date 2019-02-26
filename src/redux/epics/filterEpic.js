import {
    FILTER_REQUEST
} from '../../constants/ActionTypes';
import {
    fetchProductRequest
} from '../actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';


const filterEpic = (action$, store) => 
	action$.ofType(FILTER_REQUEST)
	.debounceTime(300)
	.switchMap(action => 
		[fetchProductRequest(Object.assign(store.getState().filter, action.payload))]
    );
    

export default filterEpic;