import React from 'react';
import { connect } from 'react-redux';
import {
    filterRequest
} from '../redux/actions';


const SearchBox = ({filter, search}) => (
	<input type="text" className="search-box" onChange={e => search(e.target.value)} />
);


export default connect(
	state => ({
		filter: state.filter
	}),
	dispatch => ({
		search: q => dispatch(filterRequest({search: q, page: 1}))
	})
)(SearchBox);