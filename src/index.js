import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppRoutes from './routes';
import reducers from 'reducers/index.js';
import 'assets/style.scss'

const store = createStore(reducers,applyMiddleware(thunkMiddleware));

function App() {
  return(
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}

ReactDOM.render(<App/>,document.getElementById('app'));