import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadUser } from './store/actions/authActions';
import store from './store';
import './App.css';
import Home from './Components/Home';

const App = () => {
  useEffect(()=> {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App
