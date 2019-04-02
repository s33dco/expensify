import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <NavLink to='/' activeClassName="is-active" exact={true}>Dashboard</NavLink>
      <NavLink to='/create' activeClassName="is-active" exact={true}>Add Expense</NavLink>
      <NavLink to='/help' activeClassName="is-active" exact={true}>Help</NavLink>
    </nav>
  </header>
);

export default Header;

