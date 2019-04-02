import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type){
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
      };
    case 'SET' :
      return {
        count : action.count
      }
    case 'RESET':
      return {
        count: state.count = 0
      };
    default:
      return state;
  }
});


// store.getState is called everytime store changes
// return value from subscribe is a function used to unsubscribe when called

const unsubcribe = store.subscribe(() => {
  console.log(store.getState());
});

// Actions - must have type plus whatever else

store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5
});

store.dispatch({
  type: 'INCREMENT',
  incrementBy: 25
});

store.dispatch({
  type: 'INCREMENT'
});

store.dispatch({
  type: 'DECREMENT',
  decrementBy :10
});

store.dispatch({
  type: 'DECREMENT'
});

store.dispatch({
  type: 'RESET'
});

store.dispatch({
  type: 'SET',
  count: 101
})

unsubcribe(); // unsubscribes - prints to console up to reset value
