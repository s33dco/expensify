import React from 'react';

// uses component state to track form before submit hence class...

export default class ExpenseForm extends React.Component{
  state = {   
    description : '',
    note : '',
    amount : ''
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