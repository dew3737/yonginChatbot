import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'modules/store';
import Chat from 'components/pages/Chat';
import './App.css';
import smoothscroll from 'smoothscroll-polyfill';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

function App() {
  smoothscroll.polyfill();
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="*" component={Chat} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
