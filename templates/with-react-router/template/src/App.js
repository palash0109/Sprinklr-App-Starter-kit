import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Home1 from './Home1'

function App() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/home" component={Home1}></Route>
        </Switch>
      </>
    );
  }
  
  export default App;
  
  