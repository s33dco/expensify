import React from 'react';
import moment from'moment';
import 'react-dates/initialize';
import { SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// uses component state to track form before submit hence class...

export default class ExpenseForm extends React.Component{

  constructor(props){
    super(props);

    this.state = {   
      description : props.expense ? props.expense.description : '',
      note : props.expense ? props.expense.note : '',
      amount : props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt : props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused : false,
      error: ''
    };
  }

  onDescriptionChange = (e) => {               
    const description = e.target.value;     // create const from target
    this.setState(()=>({description}));     // description : description es6 obj shorthand
  };

  onNoteChange = (e) => {               
    const note = e.target.value;     // create const from target
    this.setState(()=>({note}));     // description : description es6 obj shorthand
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || !isNaN(amount) || amount.match(/^\d{1,}(\.\d{1,2})?$/)) {
      this.setState(()=>({amount}))
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt){
      this.setState(()=>({createdAt}))
    }
  };

  onFocusChange = ({focused}) => {
    this.setState(() =>({calendarFocused : focused}))
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(()=>({error: 'Please provide description and amount!'}))
    } else {
      // clear error
      this.setState(()=>({error: ''}))
      this.props.onSubmit({
        description : this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note : this.state.note
      })
    }
  }

  render (){
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p>{this.state.error}</p>}
          <input 
            type='text'
            placeholder='Description'
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type='number'
            placeholder='Amount'
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            firstDayOfWeek={1}
            isOutsideRange={ () => false} // no date is outside range

          />
          <textarea
            placeholder='add a note for your expenses (optional)'
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
}