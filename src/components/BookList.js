import React from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import Book from './Book';
import Pagination from './Pagination';
import Loading from './Loading';
import SearchBox from './SearchBox';
import SortBox from './SortBox';
import FilterBox from './FilterBox';
import ClearFilter from './ClearFilter';
import CartTable from './CartTable';
// APOLLO
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
// QUERY AND MUTATION
const BOOK_QUERY = gql`
	query book($page: Int){
		book(page: $page) {			
			...on BookListResponse {
				list {
					_id
					name
					price
					img
				}
				count
			}
		}
	}
`;


function BookList(props){
	let icon_cart;
	const { filter, cart } = props;
	const totalQty = cart.list && cart.list.reduce((total, current) => total + current.qty, 0);
	const { book } = props.bookQuery;
	const list = book && book.list;
	const count = book && book.count;

	function handleClickIconCart(e){
		e.stopPropagation();
		icon_cart.classList.toggle('is-active');
	}

	function handlePageChange(page){
		const { setLoading, setFilter } = props;
		const { fetchMore } = props.bookQuery;

		setLoading(true);
        fetchMore && fetchMore({
            variables: { page },
            updateQuery: (prevResult, { fetchMoreResult }) => ({
                ...prevResult,
                book: fetchMoreResult.book
            })
        })
        .then((res) => {
			setLoading(false);
			setFilter({ page });
        });
	}

	return(
		<div className='products-page'>
			<div className='cart-area text-right'>
				<span id='icon-cart' ref={el => icon_cart = el} onClick={handleClickIconCart}>
					<img src={require('../images/icon-cart.png')} />
					{
						totalQty > 0 &&
						<span className='notification'>{totalQty}</span>
					}
				</span>
				<CartTable />
			</div>
			<div className='filter-area'>
				<div className='filter-row row'>
					<div className='column column-8-sm'>
						<SearchBox />
					</div>
					<div className='column column-4-sm'>
						<SortBox />
					</div>
				</div>
				<div className='filter-row row'>
					<div className='column column-4-sm'>
						<FilterBox 
							filterName='category'
							placeholder='Select category'
						/>
					</div>
					<div className='column column-4-sm'>
						<FilterBox 
							filterName='author'
							placeholder='Select author'
						/>
					</div>
					<div className='column column-4-sm'>
						<FilterBox 
							filterName='brand'
							placeholder='Select brand'
						/>
					</div>
				</div>
				<ClearFilter />
				<div className='item-found'>
					Results: {count}
				</div>
			</div>
			<Loading />
			{/* BEGIN BOOK LIST */}
			{
			<div className='card-list'>
				{
					list && list.map(item =>
						<Book item={item} key={item._id} />
					)
				}
			</div>
			}
			{/* END BOOK LIST */}
			<Pagination 
				page={filter.page} 
				limit={filter.limit}
				maxPage={5} 
				count={count} 
				onPageChange={handlePageChange}
			/>
		</div>
	);
};


export default compose(
	connect(
		state => ({
			list: state.product.list,
			count: state.product.count,
			filter: state.filter,
			cart: state.cart,
			all: state
		}),
		dispatch => bindActionCreators({
			setLoading: status => ({ type: status ? 'IS_LOADING' : 'STOP_LOADING'}),
			setFilter: options => ({ type: 'IS_FILTERED', payload: options })
		}, dispatch)
	),
	graphql(BOOK_QUERY, { 
		name: 'bookQuery',
		options: props => ({
			variables: {
				page: 1
			}
		}) 
	})
)(BookList);
