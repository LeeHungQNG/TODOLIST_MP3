import appReducer from './appReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  app: appReducer, // app là tên tự đặt cho reducer khi gọi bên component dùng useSelector -> state.tên reducer -> state.app.state trong app reducer
});

export default rootReducer;
