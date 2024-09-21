import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reduxConfig from './store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import ScrollToTop from './components/ScrollToTop';

const { store, persistor } = reduxConfig(); // Vì reduxConfig trả về một hàm chứ không phải biến nên phải gọi hàm

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
