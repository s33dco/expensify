import { createStore } from 'redux';

// 4 Action generators - functions that return action objects - Action must have minimum type property

const incrementCount = ({ incrementBy = 1 } = {}) => ({ // destructure obj arguement of function give default value of 1
  type: 'INCREMENT',                                    // ({ incrementBy = 1 } = {}) default obj stops undefined error
  incrementBy                                           // if no obj provided empty object used, destructure empty obj no incementBy do default of 1 used.
});
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});
const setCount = ({ count }) => ({
  type: 'SET',
  count
});
const resetCount = () => ({
  type: 'RESET'
});


// Reducers
// 1 reducers are pure functions
// 2 Never change state or action

const countReducer = (state = { count: 0 }, action) => { // this is a Reducer
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
};


const store = createStore(countReducer);


// store.subscribe() runs arrow function below everytime store changes
// store.getState is called everytime store changes
// return value from subscribe is a function used to unsubscribe when called

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});


// dispatch Action

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: -100 }));

unsubscribe(); // unsubscribes - prints to console up to reset value
