import React from 'react';

const EditExpensePage = (props) => {
  console.log(props);
  return (
    <div>Editing expense {props.match.params.id}</div>
  )
}

export default EditExpensePage;