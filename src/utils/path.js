const path = {
  PUBLIC: '/',
  HOME: '',
  LOGIN: 'login',
  STAR: '*',
  MY_MUSIC: 'mymusic',
  ALBUM__TITLE__PID: 'album/:title/:pid', // __ mean it is params
  PLAYLIST__TITLE__PID: 'playlist/:title/:pid', // __ mean it is params
  WEEKRANK__TITLE__PID: 'zing-chart-tuan/:title/:pid', // __ mean it is params
  ZING_CHART: 'zing-chart',
  SEARCH: 'tim-kiem',
  ALL: 'tat-ca',
  SONG: 'bai-hat',
  HOME__SINGER: ':singer',
  PLAYLIST_SEARCH: 'playlist',
};

export default path;
