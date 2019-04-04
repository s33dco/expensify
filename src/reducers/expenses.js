

// Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => { // default value is empty array
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
