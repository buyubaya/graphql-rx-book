import React from 'react';
import { connect } from 'react-redux';
import {
    SHOW_ALERT,
	HIDE_ALERT,
	ADD_TO_CART
} from '../constants/ActionTypes';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/ApiUtils';


const Book = ({item, isAlert, showAlert, hideAlert, cart, addToCart}) => {
	let cardImg = null;
	let cartClicked = false;
	
	const isExist = id => {
		if(cart.list){
			for(let i=0, len=cart.list.length; i<len; i++){
				if(cart.list[i].id === id){
					return true;
				}
			}
		}

		return false;
	};

	const flying = (item) => {
		if(!cartClicked){
			if(isExist(item._id) === false){
				addToCart({...item, qty: 1});

				cartClicked = true;

				if(cardImg){
					let flyingImg = document.createElement('IMG');
					let styles = `
						width: ${cardImg.width}px;
						position: absolute;			
						left: ${cardImg.offsetLeft}px;
						top: ${cardImg.offsetTop}px;
						transition: 1s;
					`;
					flyingImg.setAttribute('src', cardImg.src);
					flyingImg.setAttribute('style', styles);
					document.body.appendChild(flyingImg);
	
					let iconCart = document.getElementById('icon-cart');
					let transform = {
						width: 0,
						left: iconCart ? (iconCart.offsetLeft + iconCart.offsetWidth / 2)+'px' : '0',
						top: iconCart ? (iconCart.offsetTop + iconCart.offsetHeight / 2)+'px' : '0'
					};
					
					setTimeout(() => {
						for(let x in transform){
							flyingImg.style[x] = transform[x];
						}
					}, 0)
					setTimeout(() => {
						flyingImg.parentNode.removeChild(flyingImg);
						cartClicked = false;
					}, 1000)  
				}	
			}
			else {
				console.log('Item already exists !');
			}
		}
		else {
			showAlert({error: true, message: 'CLICKED'});
			setTimeout(() => {
				hideAlert();
			}, 1000);
		}
	}
	
	return(        
		<div className="card-product mb40">
			<div className="card-img">
				<Link to={'product/'+item._id}><img className="w100p" src={item.img} alt="" ref={el => cardImg = el} /></Link>
			</div>
			<div className="card-content pt10">
				<p className="card-name text-center">{item.name}</p>
				<p className="card-price text-center">
					{
						(item.price * 1).toLocaleString('en-US')
					}
				</p>
				<a onClick={() => flying(item)} href="javascript:;" className="btnAddToCart">Buy</a>
			</div>
		</div>
	);
};


export default connect(
	state => ({
		isAlert: state.status.showAlert,
		cart: state.cart
	}),
	dispatch => ({
		showAlert: payload => dispatch({type: SHOW_ALERT, payload}),
		hideAlert: () => dispatch({type: HIDE_ALERT}),
		addToCart: item => dispatch({type: ADD_TO_CART, payload: item})
	})
)(Book);