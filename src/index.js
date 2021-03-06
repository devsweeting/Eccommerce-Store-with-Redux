import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import cartReducer from './constants/CartReducer';
import ordersReducer from './constants/ordersReducer';

import persistDataLocally from './middleware/persist-data-locally';
import constants from './constants';
const { c } = constants;

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  initialState: null,
});

let retrievedState;
try {
  retrievedState = localStorage.getItem('reduxStore');
  if (retrievedState === null) {
    retrievedState = {};
  }
  retrievedState = JSON.parse(retrievedState);
} catch (err) {
  retrievedState = {};
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const AppContainer = styled.section `
  width: 1000px;
  margin: 10px auto;
  background-color: white;
  padding: 10px 20px;
`;

const store = createStore(
  rootReducer,
  retrievedState,
  composeEnhancer(applyMiddleware(persistDataLocally))
);

store.subscribe(() =>
  console.log(store.getState())
);


const app = <Provider store={ store }>
  <BrowserRouter>
    <AppContainer>
      <App />
    </AppContainer>
  </BrowserRouter>
</Provider>

ReactDOM.render(app, document.getElementById('root'));
