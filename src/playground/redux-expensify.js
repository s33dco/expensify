import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE

const addExpense = (
  {
    description = '',   // default value is none parsed
    note = '',          // default value is none parsed
    amount = 0,         // default value is none parsed
    createdAt = 0       // default value is none parsed
  }={}
  ) => ({
  type: 'ADD_EXPENSE',
    expense: {          // expense object with properties passed
      id: uuid(),       // make an id
      description,      // from object passed to generator function
      note,
      amount,
      createdAt
    }
});


// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({  
  type: 'REMOVE_EXPENSE',
  id
});


// EDIT_EXPENSE

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
})

// SORT_BY_AMOUNT

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE

const setStartDate = (startDate) => ({ // no need to set up default as default default is undefined
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => { // default value is empty array
  switch (action.type){
    case 'ADD_EXPENSE':
      return [
        ...state,               // spread array of expenses
        action.expense          // concat new expense on end
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => id !== action.id ); // destructure id from expense obj in state array
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,         // spread out expense
            ...action.updates   // spread out action.updates to overwrite/update properties
          };
        } else {
          return expense;
        };
      });
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
    case 'SET_TEXT_FILTER':
      return {
        ...state,             // spead out state values
        text: action.text     // update text value
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
}

// get visible expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date'){
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1;
    } 
  });
};



// Store Creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log('visible', visibleExpenses);
  console.log('state', state);
});

const expenseOne = store.dispatch(addExpense({description:'Rent', amount:100, createdAt: 1000})); // dispatch function returns action obj
const expenseTwo = store.dispatch(addExpense({description:'Food', amount:500, createdAt: -1000}));
const expenseThree = store.dispatch(addExpense({description:'Drink', amount:300, createdAt: 2000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(removeExpense({id: expenseTwo.expense.id}));

// store.dispatch(editExpense(expenseThree.expense.id, { amount : 2500})) // 2 arguements expense id and update object.

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());


// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(125));
// store.dispatch(setEndDate());

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


// // using spread on objects, adding and over riding properties
// const user = {
//   name: 'tony',
//   age :100
// };

// console.log(user);

// console.log({ 
//   ...user,
// location : 'Hometown', // over ride properties after spread...
// age: 21
// });