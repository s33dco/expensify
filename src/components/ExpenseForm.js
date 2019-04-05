import React from 'react';
import moment from'moment';
import 'react-dates/initialize';
import { SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// uses component state to track form before submit hence class...

export default class ExpenseForm extends React.Component{
  state = {   
    description : '',
    note : '',
    amount : '',
    createdAt : moment(),
    calendarFocused : false
  };

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
    if (amount.match(/^[0-9]+(\.[0-9]{1,2})?$/)) {
      this.setState(()=>({amount}))
    }
  }

  onDateChange = (createdAt) => {
    this.setState(()=>({createdAt}))
  }

  onFocusChange = ({focused}) => {
    this.setState(() =>({calendarFocused : focused}))
  }



  render (){
    return (
      <div>
        <form>
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
            id='createdAt'
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