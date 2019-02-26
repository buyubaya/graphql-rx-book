import React from 'react';
import { connect } from 'react-redux';
import {
    filterRequest
} from '../redux/actions';


const SortBox = ({filter, sort}) => (
	<select className="sort-box" onChange={e => sort(e.target.value)}>
        <option value={'latest'}>Latest</option>
        <option value={'oldest'}>Oldest</option>
        <option value={'a-z'}>A - Z</option>
        <option value={'z-a'}>Z - A</option>
        <option value={'price-asc'}>Price Ascending</option>
        <option value={'price-desc'}>Price Descending</option>
    </select>
);


export default connect(
	state => ({
		filter: state.filter
	}),
	dispatch => ({
		sort: q => dispatch(filterRequest({sort: q, page: 1}))
	})
)(SortBox);