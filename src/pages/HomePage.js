import React from 'react';
import { connect } from 'react-redux';
import CustomLink from '../components/CustomLink';
import BookList from '../components/BookList';


class HomePage extends React.Component {
    render(){
        const { user } = this.props;

        return(
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
                <BookList />
            </div>
        );
    }
}


export default connect(
    state => ({
        user: state.user
    })
)(HomePage);