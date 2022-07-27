import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './store/store';

const root = document.getElementById('root') as HTMLElement

interface GlobalState{
  store: Store
}

const store = new Store()

export const Context = createContext<GlobalState>({
  store
})

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{ store }}>
        <App />
    </Context.Provider>
  </React.StrictMode>,
  root
);