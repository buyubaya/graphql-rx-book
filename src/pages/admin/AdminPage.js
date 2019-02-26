import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import CustomLink from '../../components/CustomLink';


class AdminPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        const { login } = this.props;
        let user = this._getUser();
        user && login && login(user);
    }

    _getUser(){
        let user = sessionStorage.getItem('user');
        user = user ? JSON.parse(user) : {};
        if(!user){
            user = this.props.user;
        }
        return user;
    }

    render() {
        const user = this._getUser();
        
        return (
            user.username
                ?
                <div className='wrap-lg'>
                    <div className='admin-header row'>
                        <ul className='admin-nav fl'>
                            <CustomLink to='/' exact>Home</CustomLink>
                            <CustomLink to='/admin/book'>Admin - Books</CustomLink>
                        </ul>
                        <ul className='admin-nav fr'>
                            {
                                (user && user.username)
                                ?
                                <CustomLink to='/user/logout'>Log out</CustomLink>
                                :
                                <CustomLink to='/user/login'>Log in</CustomLink>
                            }
                        </ul>
                    </div>
                    {this.props.children}
                </div>
                :
                <Redirect to='/user/login' />
        );
    }
}


export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        login: user => dispatch({ type: 'FETCH_USER_SUCCESS', payload: user })
    }) 
)(AdminPage);