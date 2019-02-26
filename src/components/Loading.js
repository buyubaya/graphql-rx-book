import React from 'react';
import { connect } from 'react-redux';


const Loading = ({ isLoading }) => (
    isLoading
    ?
    <div className="text-center mt20 mb20">
        <div className='loading-fish'>
            <span className='loading-fish-tail'></span>
            <span className='loading-fish-body v3'></span>
            <span className='loading-fish-body v2'></span>
            <span className='loading-fish-body v1'></span>
            <span className='loading-fish-head'></span>   
        </div>
    </div>
    :
    null
);


export default connect((state) => {
	return {isLoading: state.status.isLoading};
})(Loading);