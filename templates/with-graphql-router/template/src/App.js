import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Data from './Data'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

function App() {
    return (
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/data" component={Data}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </ApolloProvider>
    );
  }
  
  export default App;
