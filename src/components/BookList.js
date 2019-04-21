import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import Pagination from './Pagination';
import Loading from './Loading';
import SearchBox from './SearchBox';
import SortBox from './SortBox';
import FilterBox from './FilterBox';
import ClearFilter from './ClearFilter';
import CartTable from './CartTable';
// APOLLO
import { compose, graphql, Query } from "react-apollo";
import gql from "graphql-tag";
// QUERY AND MUTATION
const BOOK_QUERY = gql`
	query book($id: ID, $page: Int, $limit: Int) {
		book(id: $id, page: $page, limit: $limit) {
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
const CATEGORY_QUERY = gql`
	query category($id: ID) {
		category(id: $id) {
			_id
			name
		}
	}
`;
const AUTHOR_QUERY = gql`
	query author($id: ID) {
		author(id: $id) {
			_id
			name
		}
	}
`;
const BRAND_QUERY = gql`
	query brand($id: ID) {
		brand(id: $id) {
			_id
			name
		}
	}
`;
// RENDERING
// const renderQuery = Comp => props => ({ loading, error, data }) => {
// 	if (loading) return 'Loading...';
// 	if (error) return `Error! ${error.message}`;

// 	return <Comp {...props} data={data['category']} />;
// };
// const CustomQuery = Comp => props => {
// 	return(
// 		<Query query={props.query}>
// 			{({ loading, error, data }) => {
// 				if (loading) return "Loading...";
// 				if (error) return `Error! ${error.message}`;

// 				return (
// 					<Comp {...props} />
// 				);
// 			}}
// 		</Query>
// 	);
// };
const renderQuery = comp => ({ loading, error, data }) => {
	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;
	
	return React.cloneElement(comp, { data: data[comp.props.filterName] });
};
const CustomQuery = (props) => {
	
	return(
		<Query {...props}>
			{
				({ loading, error, ...rest }) => {
					if (loading) return "Loading...";
					if (error) return `Error! ${error.message}`;
					
					return props.children(rest);
				}
			}
		</Query>
	);
};


function BookList(props, context) {
	let icon_cart;
	const { bookData } = props;
	const { filter, setFilter, cart } = context;
	const totalQty = cart.list && cart.list.reduce((total, current) => total + current.qty, 0);
	const list = bookData && bookData.list;
	const count = bookData && bookData.count;

	function handleClickIconCart(e) {
		e.stopPropagation();
		icon_cart.classList.toggle('is-active');
	}

	function handlePageChange(page) {
		props.onPageChange && props.onPageChange(page);
	}

	function handleSearchChange(value) {
		const { filter, setFilter } = context;
		setFilter && setFilter({
			...filter,
			search: value,
			page: 1
		});
	}

	function handleSortChange(value) {
		const { filter, setFilter } = context;
		setFilter && setFilter({
			...filter,
			sort: value,
			page: 1
		});
	}

	return (
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
						<SearchBox value={filter['search'] || ''} onChange={handleSearchChange} />
					</div>
					<div className='column column-4-sm'>
						<SortBox value={filter['sort'] || ''} onChange={handleSortChange} />
					</div>
				</div>
				<div className='filter-row row'>
					<div className='column column-4-sm'>
						<CustomQuery query={CATEGORY_QUERY}>
							{({ data }) => (
								<FilterBox
									filterName='category'
									placeholder='Select category'
									data={data['category']}
									value={filter['category'] || ''}
									onChange={value => {
										setFilter && setFilter({
											...filter,
											category: value,
											page: 1
										});
									}}
								/>
							)}
						</CustomQuery>
					</div>
					<div className='column column-4-sm'>
						<CustomQuery query={AUTHOR_QUERY}>
							{({ data }) => (
								<FilterBox
									filterName='author'
									placeholder='Select author'
									data={data['author']}
									value={filter['author'] || ''}
									onChange={value => {
										setFilter && setFilter({
											...filter,
											author: value,
											page: 1
										});
									}}
								/>
							)}
						</CustomQuery>
					</div>
					<div className='column column-4-sm'>
						<CustomQuery query={BRAND_QUERY}>
							{({ data }) => (
								<FilterBox
									filterName='brand'
									placeholder='Select brand'
									data={data['brand']}
									value={filter['brand'] || ''}
									onChange={value => {
										setFilter && setFilter({
											...filter,
											brand: value,
											page: 1
										});
									}}
								/>
							)}
						</CustomQuery>
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

BookList.contextTypes = {
	filter: PropTypes.object,
	setFilter: PropTypes.func,
	cart: PropTypes.object
};


export default BookList;
