import React from 'react';
import sprlogo from './sprlogo.svg'
import './App.css'
import Data from './Data'

function App() {
    return (
      <div className="App">
          <img src={sprlogo} className="App-logo"></img>
          <h1 className="App-header">Welcome to Sprinklr's react app</h1>
          <h1>"create-spr-app"</h1>
          <Data/>
      </div>
    );
  }
  
  export default App;
  