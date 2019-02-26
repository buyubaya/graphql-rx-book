import React, { Component } from 'react';
import './App.css';
import 'rxjs';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/admin/AdminPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBookPage from './pages/admin/AdminBookPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLogoutPage from './pages/admin/AdminLogoutPage';
import SamplePage from './pages/SamplePage';


class App extends Component {
	render(){
		return (
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/user/login' exact component={AdminLoginPage} />
					<Route path='/user/logout' exact component={AdminLogoutPage} />
					<Route path='/admin'>
						<AdminPage>
							<Route path='/admin/dashboard' exact component={AdminDashboardPage} />
							<Route path='/admin/book' exact component={AdminBookPage} />
						</AdminPage>
					</Route>
					<Route path='/sample' exact component={SamplePage} />
				</Switch>
			</BrowserRouter>
		);
	}
}


export default App;
