import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { thunk } from 'redux-thunk'; // hỗ trợ viết code bất đồng bộ khi dùng redux -> dùng action gọi api
const reduxConfig = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};

export default reduxConfig;
