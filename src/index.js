import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reduxConfig from './store';
import { BrowserRouter } from 'react-router-dom';
const store = reduxConfig(); // Vì reduxConfig trả về một hàm chứ không phải biến nên phải gọi hàm

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
