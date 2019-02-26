import React from 'react';


const Pagination = ({page, limit, count, toPage, maxPage}) => {
	let totalPage = Math.ceil(count / limit);
	let startPage = page - (Math.ceil(maxPage / 2) - 1);
	let endPage = page + Math.floor(maxPage / 2);
	if(startPage < 1){
		startPage = 1;
		endPage = startPage + (maxPage - 1);
	}
	if(endPage > totalPage){
		endPage = totalPage;
		startPage = endPage - (maxPage - 1);
	}
	startPage = startPage > 1 ? startPage : 1;
	endPage = endPage < totalPage ? endPage : totalPage;

	var pArr = [];
	for(var i=startPage; i<=endPage; i++){
		pArr.push(i);
	}
	
	return(
		totalPage > 1 
		?
		<ul className="pagination text-center mt20 mb40">
			{
			startPage > 1 &&
			[
				<li key={1}><a href="javascript:;" onClick={() => toPage && toPage(1)}>&lt;</a></li>,
				<li key={'prevPageGroup'}><a href="javascript:;" onClick={() => toPage && toPage(page - maxPage < 1 ? 1 : page - maxPage)}>...</a></li>
			]
			}
			{
			pArr.map((item) => {
				return <li className={item == page ? 'is-active' : ''} key={item} onClick={() => toPage && toPage(item)}><a href="javascript:;">{item}</a></li>})
			}
			{
			endPage < totalPage &&
			[
				<li key={'nextPageGroup'}><a href="javascript:;" onClick={() => toPage && toPage(page + maxPage > totalPage ? totalPage : page + maxPage)}>...</a></li>,
				<li key={totalPage}><a href="javascript:;" onClick={() => toPage && toPage(totalPage)}>&gt;</a></li>
			]
			}
		</ul>
		:
		null
	)   
};


export default Pagination;