import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
      <div className="app">
        <Router>
        <header className="app-header">
          <div className='app-heading'><b>SPENDWISE</b> - <span>Track, Discipline and Grow Rich</span></div>
          <div className='menu-actions'>
            <Link to="/" className="credit">
              DASHBOARD
            </Link>
            <Link to="/credit" className="credit">
              CREDIT
            </Link>
            <Link to="/debit" className="debit">
              DEBIT
            </Link>
          </div>
        </header>
        <Switch>
          <Route path="/">
              <Dashboard />
          </Route>
          <Route path="/credit">
              
          </Route>
          <Route path="/debit">
            
          </Route>
        </Switch>
        </Router>
      </div>
  );
}

export default App;
