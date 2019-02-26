import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { 
    USER_API_URL
} from '../../constants/ApiUrls';


class AdminLogoutPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        const { logout } = this.props;
        sessionStorage.removeItem('user');
        logout && logout({});
        console.log('LOG OUT');
    }

    render(){
        return(
            <Redirect to='/' />
        );
    }
}


export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        logout: () => dispatch({ type: 'FETCH_USER_SUCCESS', payload: {} })
    })
)(AdminLogoutPage);