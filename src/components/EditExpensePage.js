import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses'


const EditExpensePage = (props) => (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(editExpense(props.expense.id, expense));
          props.history.push('/');
        }}
      />
      <button onClick={(e) => {
        console.log(e);
        props.dispatch(removeExpense(props.expense));
        props.history.push('/');
      }}>delete</button>
    </div>
)

const mapStateToProps = (state, props) => {       // search expenses array from store for expense gives component current expense obj
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditExpensePage);