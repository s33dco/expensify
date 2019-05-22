import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' // provides components access to store
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css'
import { firebase } from './firebase/firebase'
import './styles/styles.scss'
import './firebase/firebase'

const store = configureStore()
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

let hasRendered = false
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'))
		hasRendered = true
	}
}

ReactDOM.render(<p>loading...</p>, document.getElementById('app'))

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		console.log('uid', user.uid)
		store.dispatch(login(user.uid))
		store.dispatch(startSetExpenses()).then(() => {
			renderApp()
			if (history.location.pathname === '/') {
				history.push('/dashboard')
			}
		})
	} else {
		store.dispatch(logout())
		renderApp()
		history.push('/')
	}
})
