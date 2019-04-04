import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';           // provides components access to store
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

// add some expenses

store.dispatch(addExpense({description:'Rent bill', amount:3700, createdAt: 1000}));
store.dispatch(addExpense({description:'Clothing', amount:2300, createdAt: 3000}));
store.dispatch(addExpense({description:'Elec bill', amount:5200, createdAt: 2000}));
store.dispatch(setTextFilter('bill'));
store.dispatch(setTextFilter('Rent'));
store.dispatch(setTextFilter('poodles'));

setTimeout(() => {
  store.dispatch(setTextFilter('dolphins'));
}, 3000);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>           
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));