import React from 'react';
import { connect } from 'react-redux';
import {
    CLEAR_FILTER
} from '../constants/ActionTypes';
import { defaultFilter } from '../redux/reducers/filterReducer';


const ClearFilter = ({ isFiltered, clearFilter, filterParams }) => {
	// let params = [];
	// for(let x in filterParams){
	// 	if(!['page', 'limit'].includes(x)){
	// 		params.push(`${x}: ${filterParams[x]}`);
	// 	}
	// }

	return(
		isFiltered
		?
		<div className='clear-filter-area'>
			<div>
				<span className="btnClearFilter" onClick={clearFilter}>Clear Filter</span>
			</div>
		</div>
		:
		null
	)
};


export default connect(
	state => ({
		isFiltered: state.status.isFiltered,
		filterParams: state.filter
	}),
	dispatch => ({
		clearFilter: () => dispatch({type: CLEAR_FILTER})
	})
)(ClearFilter);