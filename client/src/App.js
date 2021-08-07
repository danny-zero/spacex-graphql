import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Launches from './components/Launches';
import Launch from './components/Launch';
import Rocket from './components/Rocket';
import './App.css';
import logo from './logo.png';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <div className="container">
          <Link to="/"><img src={logo} alt="SpaceX" style={{ width: 300, display: 'block', margin: 'auto' }} /></Link>
          <Route exact path="/"><Launches /></Route>
          <Route exact path="/launch/:flight_number"><Launch /></Route>
          <Route exact path="/rocket"><Rocket id="5e9d0d95eda69973a809d1ec" /></Route>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
