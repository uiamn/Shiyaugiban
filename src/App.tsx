import React from 'react';
import { Provider } from 'react-redux'
import Store from './Store'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Main from './Main'

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App;
