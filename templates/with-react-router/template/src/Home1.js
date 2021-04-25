import React from 'react';
import sprlogo from './sprlogo.svg';
import './App.css'
import { Link } from 'react-router-dom';


function Home1() {
    return (
      <div className="App">
          <img src={sprlogo} className="App-logo"></img>
          <h1 className="App-header">Home Page</h1>
          <h1>"create-spr-app"</h1>
          <Link to="/" > Back</Link> 
      </div>
    );
  }
  
  export default Home1;
  