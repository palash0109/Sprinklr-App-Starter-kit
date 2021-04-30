import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Home1 from './Home1'

function App() {
    return (
      <>
        <Switch>
          <Route exact path="/home" component={Home1}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </>
    );
  }
  
  export default App;
  
  