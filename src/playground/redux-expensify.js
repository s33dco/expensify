import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE


const addExpense = (
  {
    description = '', 
    note = '', 
    amount = 0, 
    createdAt = 0 
  }={}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})
// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({  
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => { // default value is empty array
  switch (action.type){
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => id !== action.id ) // destructure id from expense obj
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}


// Store Creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({description:'Rent', amount:100})); // dispatch function returns action obj
const expenseTwo = store.dispatch(addExpense({description:'Food', amount:200}));
const expenseThree = store.dispatch(addExpense({description:'Drink', amount:500}));

store.dispatch(removeExpense({id: expenseOne.expense.id}));
store.dispatch(removeExpense({id: expenseTwo.expense.id}));

const demoState = {
  expenses : [{
    id: '23145235',
    description: 'January Rent',
    notes: 'this was the final payment that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};