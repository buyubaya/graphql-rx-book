import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomLink from '../components/CustomLink';
import BookList from '../components/BookList';
// GRAPHQL
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";


const BOOK_QUERY = gql`
	query book(
        $id: ID, 
        $page: Int, $limit: Int,
        $category: String, $author: String, $brand: String,
        $sort: String, $search: String
    ) {
		book(
            id: $id, 
            page: $page, limit: $limit,
            category: $category, author: $author, brand: $brand,
            sort: $sort, search: $search
        ) {
			... on BookListResponse {
				list {
					_id
					name
					price
					img
					category {
						_id
						name
					}
				}
				count
			}

			... on Book {
				_id
				name
			}
		}
	}
`;


class HomePage extends React.Component {
    static childContextTypes = {
        filter: PropTypes.object,
        setFilter: PropTypes.func,
        cart: PropTypes.object
    }

    getChildContext(){
        return({
            filter: this.props.filter,
            setFilter: this.props.setFilter,
            cart: this.props.cart
        });
    }

    handlePageChange = (page) => {
        const { setLoading, setFilter, bookQuery } = this.props;
		// const fetchMore = bookQuery && bookQuery.fetchMore;
        
		// setLoading(true);
		// fetchMore && fetchMore({
		// 	variables: { page },
		// 	updateQuery: (prevResult, { fetchMoreResult }) => ({
		// 		...prevResult,
		// 		book: fetchMoreResult.book
		// 	})
		// })
		// .then((res) => {
		// 	// setLoading(false);
		// 	setFilter({ page });
        // });
        setFilter({ page });
    }

    componentWillReceiveProps(newProps){
        const refetch = newProps.bookQuery && newProps.bookQuery.refetch;
        refetch && refetch({
            ...newProps.filter
        });
    }

    render(){
        const { user, bookQuery } = this.props;
        const bookData = bookQuery.book;

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
                
                <BookList bookData={bookData} onPageChange={this.handlePageChange} />
            </div>
        );
    }
}


export default compose(
    connect(
        state => ({
            user: state.user,
            filter: state.filter,
            cart: state.cart
        }),
        dispatch => bindActionCreators({
			setLoading: status => ({ type: status ? 'IS_LOADING' : 'STOP_LOADING' }),
			setFilter: options => ({ type: 'IS_FILTERED', payload: options })
		}, dispatch)
    ),
    graphql(BOOK_QUERY, {
		name: 'bookQuery',
		options: props => ({
			variables: {
				...props.filter
			}
		})
	})
)(HomePage);