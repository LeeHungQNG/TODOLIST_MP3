import actionTypes from '../actions/actionTypes';

const initState = {
  curSongId: null,
  curSongData: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
  curAlbumId: null,
  recentSongs: [],
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };
    case actionTypes.SET_CUR_SONG_DATA:
      return {
        ...state,
        curSongData: action.data || null,
      };
    case actionTypes.SET_CUR_ALBUM_ID:
      return {
        ...state,
        curAlbumId: action.pid || null,
      };
    case actionTypes.SET_RECENT:
      let songs = state.recentSongs;
      if (action.data) {
        if (state.recentSongs?.some((i) => i.sid === action.data.sid)) {
          // Xử lý bài hát khi bị trùng trong chức năng nghe gần đây
          songs = songs.filter((i) => i.sid !== action.data.sid);
        }
        if (songs.length > 19) {
          // chiểu dài mảng lớn hơn 2 thì xóa phần tử cuối
          songs = songs.filter((item, index, self) => index !== self.length - 1); // self là chính mảng songs => mảng có 10 phần tử thì index = 9; self.length - 1 = 9 -> lấy từ 0 -> 8
        }
        songs = [action.data, ...songs]; // thêm pt đầu mảng sau khi xóa pt cuối có length > 20
      }
      return {
        ...state,
        recentSongs: songs,
      };

    default:
      return state;
  }
};

export default musicReducer;
