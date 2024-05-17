import appReducer from './appReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import musicReducer from './musicReducer';

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const musicConfig = {
  ...commonConfig,
  key: 'music',
  whitelist: ['curSongId'], // cấu hình chỉ lưu state curSongId trong musicReducer xuống localstorage
};

const rootReducer = combineReducers({
  app: appReducer, // app là tên tự đặt cho reducer khi gọi bên component dùng useSelector -> state.tên reducer -> state.app.state trong app reducer
  music: persistReducer(musicConfig, musicReducer),
});

export default rootReducer;
