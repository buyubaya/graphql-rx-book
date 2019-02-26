import {
    CLEAR_FILTER
} from '../../constants/ActionTypes';
import {
    fetchProductRequest
} from '../actions';
import { defaultFilter } from '../reducers/filterReducer';


const ClearFilterEpic = (action$, store) => 
	action$.ofType(CLEAR_FILTER)
	.switchMap(action => 
		[fetchProductRequest(defaultFilter)]
    );
    

export default ClearFilterEpic;