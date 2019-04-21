import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Book from '../components/Book';
import CustomLink from '../components/CustomLink';
// GRAPHQL
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";


const BOOK_QUERY = gql`
    fragment BookDetail on Book {
        _id
        name
        price
        description
        img
    }

	query book($id: ID, $page: Int, $limit: Int) {
		book(id: $id) {
			... on Book {
				...BookDetail
                category {
                    _id
                    name
                }
                author {
                    name
                }
                brand {
                    name
                }
                relatedBook(page: $page, limit: $limit) {
                    list {
                        ...BookDetail
                    }
                    count
                    page
                    limit
                }
			}
		}
	}
`;


class HomePage extends React.Component {
    constructor(){
        super();

        this.state = {
            page: 1,
            limit: 1,
            count: 1
        };
    }

    componentWillReceiveProps(newProps){
        const newBookId = newProps.match && newProps.match.params.bookId;
        const oldBookId = this.props.match && this.props.match.params.bookId;
        if(newBookId !== oldBookId){
            const refetch = newProps.bookQuery && newProps.bookQuery.refetch;
            refetch && refetch({
                id: newBookId
            });
        }

        const limit = newProps.bookQuery && newProps.bookQuery.book && newProps.bookQuery.book.relatedBook.limit;
        const page = newProps.bookQuery && newProps.bookQuery.book && newProps.bookQuery.book.relatedBook.page;
        const count = newProps.bookQuery && newProps.bookQuery.book && newProps.bookQuery.book.relatedBook.count;
        const _limit = this.props.bookQuery && this.props.bookQuery.book && this.props.bookQuery.book.relatedBook.limit;
        const _page = this.props.bookQuery && this.props.bookQuery.book && this.props.bookQuery.book.relatedBook.page;
        const _count = this.props.bookQuery && this.props.bookQuery.book && newProps.bookQuery.book.relatedBook.count;

        if(
            limit !== _limit || page !== _page || count !== _count
        ){
            this.setState({ limit, page, count });
        }
    }

    handleLoadMore = () => {
        const { page } = this.state;
        const fetchMore = this.props.bookQuery && this.props.bookQuery.fetchMore;
        
        fetchMore && fetchMore({
			variables: { page: page + 1 },
			updateQuery: (prevResult, { fetchMoreResult }) => ({
				...prevResult,
				book: {
                    ...fetchMoreResult.book,
                    relatedBook: {
                        ...prevResult.book.relatedBook,
                        list: [
                            ...prevResult.book.relatedBook.list,
                            ...fetchMoreResult.book.relatedBook.list
                        ],
                        page: fetchMoreResult.book.relatedBook.page
                    }
                }
			})
		});
    }

    render(){
        const { page, limit,count } = this.state;
        const maxPage = Math.ceil(count / limit);
        const { user, bookQuery, addToCart } = this.props;
        const bookData = bookQuery.book;
        const relatedBook = bookData && bookData.relatedBook && bookData.relatedBook.list;
        
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

                <div className='filter-area book-detail-area'>
                    {bookData && 
                        <>
                            <img src={bookData.img} className='book-detail-img' />
                            <div className='book-detail-info'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{bookData.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td><b>${bookData.price}</b></td>
                                        </tr>
                                        <tr>
                                            <th>Category</th>
                                            <td>{bookData.category.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Author</th>
                                            <td>{bookData.author.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Brand</th>
                                            <td>{bookData.brand.name}</td>
                                        </tr>
                                        <tr>
                                            <td><a href='javascript:;' className='btnAddToCart' onClick={() => addToCart({...bookData, qty: 1})}>BUY</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
                </div>

                <h2 className='section-title'><span>Related Books</span></h2>
                {
                    relatedBook &&
                    <>
                        <div className='card-list'>
                            {
                                relatedBook.map(item =>
                                    <Book item={item} key={item._id} />
                                )
                            }
                        </div>
                        {
                            page < maxPage && 
                            <a href='javascript:;' className='btnAddToCart' onClick={this.handleLoadMore}>Load more</a>
                        }
                    </>
                }
            </div>
        );
    }
}


export default compose(
    connect(
        state => ({
            user: state.user,
            cart: state.cart
        }),
        dispatch => ({
            addToCart: item => dispatch({type: 'ADD_TO_CART', payload: item})
        })
    ),
    graphql(BOOK_QUERY, {
		name: 'bookQuery',
		options: props => ({
            variables: {
                id: props.match && props.match.params.bookId,
                page: 1,
                limit: 3
            }
        })
	})
)(HomePage);