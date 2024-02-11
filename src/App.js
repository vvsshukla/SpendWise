import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
      <div className="app">
        <header className="app-header">
          <div className='app-heading'><b>SPENDWISE</b> - <span>Track, Discipline and Grow Rich</span></div>
        </header>
        <Dashboard />
      </div>
  );
}

export default App;
