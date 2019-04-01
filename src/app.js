import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
  <div>this is the dashboard component page</div>
)

const AddExpensePage = () => (
  <div>this is add expense page</div>
)

const EditExpensePage = () => (
  <div>this is edit expense page</div>
)

const HelpPage = () => (
  <div>this is help page</div>
)

const NotFoundPage = () => (
  <div>404! <Link to='/'>Go Home</Link></div>
)

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <NavLink to='/' activeClassName="is-active" exact={true}>Dashboard</NavLink>
      <NavLink to='/create' activeClassName="is-active" exact={true}>Add Expense</NavLink>
      <NavLink to='/edit' activeClassName="is-active" exact={true}>Edit Expense</NavLink>
      <NavLink to='/help' activeClassName="is-active" exact={true}>Help</NavLink>
    </nav>
  </header>
)

const routes = (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true}/>
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>   
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));