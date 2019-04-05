import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';           // provides components access to store
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

// add some expenses
store.dispatch(addExpense({description:'Food', amount:9200, createdAt: 5000}));
store.dispatch(addExpense({description:'Rent bill', amount:3700, createdAt: 1000}));
store.dispatch(addExpense({description:'Clothing', amount:2300, createdAt: -3000}));
store.dispatch(addExpense({description:'Elec bill', amount:6200, createdAt: 2000}));
store.dispatch(addExpense({description:'Drink', amount:19200, createdAt: -5000}));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>           
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));