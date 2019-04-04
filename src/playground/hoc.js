// Higher Order Component (HOC) - A component (HOC) that renders another component
// reuse code
// Render hijacking
// prop manipulation
// abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>the info is : {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (                                 // this is the HOC
    <div>
      {props.isAdmin && <p>This is private info please don't share</p>}
      <WrappedComponent {...props}/>
    </div>
  );
};

// const AdminInfo = withAdminWarning(Info);


const requireAuthentication = (WrappedComponent) => {
  return (props) => (                                                                     // this is the HOC
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props}/>
        ) : (
          <p>you need to log in first</p>
      )}
    </div>
  )
}





const AuthInfo = requireAuthentication(Info);





// ReactDOM.render(<AdminInfo isAdmin={true} info="these are the details"/>, document.getElementById('app'));

ReactDOM.render(<AuthInfo isAuthenticated={false} info="these are the details"/>, document.getElementById('app'));