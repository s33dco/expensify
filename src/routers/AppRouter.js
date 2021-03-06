import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import LoginPage from '../components/LoginPage'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import EditExpensePage from '../components/EditExpensePage'
import AddExpensePage from '../components/AddExpensePage'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createBrowserHistory()

const AppRouter = () => (
	// changed from BrowserRouter so own history can be passed in as prop, otherwise can't redirect on login as login is not a component registered on a route, this way get history api
	<Router history={history}>
		<div>
			<Switch>
				<PublicRoute path='/' component={LoginPage} exact={true} />
				<PrivateRoute path='/dashboard' component={ExpenseDashboardPage} />
				<PrivateRoute path='/create' component={AddExpensePage} />
				<PrivateRoute path='/edit/:id' component={EditExpensePage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
)

export default AppRouter
