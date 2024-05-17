import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { thunk } from 'redux-thunk'; // hỗ trợ viết code bất đồng bộ khi dùng redux -> dùng action gọi api
import { persistStore } from 'redux-persist';

const reduxConfig = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return { store, persistor };
};

export default reduxConfig;
