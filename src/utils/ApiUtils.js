import { Observable } from 'rxjs/Observable';
import {
	BOOK_API_URL
} from '../constants/ApiUrls';
// export const API_URL = 'https://hieu1801.000webhostapp.com';
export const API_URL = 'http://localhost:3000';
export const ADMIN_API_URL = 'http://nodejs-book-api.herokuapp.com';


export const fetchAPI = (params={}) => {
	let q = [];
	for(let param in params){
		if(params[param]){
			q.push(param+'='+params[param]);   
		}
	}
	q = q.length?q = '?'+q.join('&'):'';
	return Observable.fromPromise(
		fetch(BOOK_API_URL + q)
		.then(res => res.json())
	);
};

export function fetchData(url){
	return new Promise((rs,rj) => {
		fetch(url)
		// .then(res => res.json()) 
		.then(data => {
			console.log('fetch', data);
			rs(data);
		});
	});
}