import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createRootReducer from './reducers/index';
import thunk from "redux-thunk" 
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Funding from './components/funding/funding';
import NavMenu from './components/nav/navMenu';
import Assistance from './components/assistance/assistance';
import Home from './components/home/home';
import {Route, Link, Switch } from "react-router-dom";
import {ConnectedRouter} from 'connected-react-router';
import Copyright from './components/home/copyright';

export const history = createBrowserHistory()

const store = createStore(createRootReducer(history),
 composeWithDevTools(
    applyMiddleware(
      thunk, 
      routerMiddleware(history)
    )
  )
);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          <NavMenu />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/funding" exact component={Funding} />
            <Route path="/assistance" exact component={Assistance} />
          </Switch>
          <Copyright />
        </div>
      </ConnectedRouter>
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

