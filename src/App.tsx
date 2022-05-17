import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        

        <div className="ui breadcrumb">
          <a className="section">Home</a>
          <i className="right chevron icon divider"></i>
          <a className="section">Registration</a>
          <i className="right arrow icon divider"></i>
          <div className="active section">Personal Information</div>
        </div>
    </div>

    
  );
}

export default App;
