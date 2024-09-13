import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Album, Home, Login, Personal, Public, SearchSongs, WeekRank, ZingChart, Search, SearchAll, Singer, SearchPlaylist } from './containers/public';
import { Route, Routes } from 'react-router-dom';
import path from './utils/path';
import * as actions from './store/actions';
import { apiGetChartHome } from './apis';

function App() {
  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState(null);

  // Lấy width lần đầu
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(actions.getHome());
    const fetchChartData = async () => {
      const res = await apiGetChartHome();
      if (res.data.err === 0) setWeekChart(res.data.data.weekChart);
    };

    fetchChartData();
  }, [dispatch]);

  // Hàm setwidth khi resize
  const setWidth = (e) => {
    setCurrentWidth(e.target.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', setWidth);
    return () => {
      window.removeEventListener('resize', setWidth);
    };
  }, []);

  // truyen width cho cac page
  useEffect(() => {
    dispatch(actions.setCurrentWidth(currentWidth));
  }, [currentWidth]);

  return (
    <>
      <div className="">
        <Routes>
          {/* Nested router */}
          <Route path={path.PUBLIC} element={<Public></Public>}>
            {/* Route con mặc định lấy path của cha nằm ngoài / */}
            {/* <Route path="home" element={<Home></Home>} /> */}
            <Route path={path.HOME} element={<Home></Home>} />
            <Route path={path.LOGIN} element={<Login></Login>} />
            <Route path={path.MY_MUSIC} element={<Home></Home>} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album></Album>} />
            <Route path={'radio'} element={<Home></Home>} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album></Album>} />
            <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRank weekChart={weekChart && Object.values(weekChart)}></WeekRank>} />
            <Route path={path.ZING_CHART} element={<ZingChart></ZingChart>} />
            <Route path={path.HOME__SINGER} element={<Singer></Singer>} />
            <Route path={path.HOME_ARTIST__SINGER} element={<Singer></Singer>} />
            <Route path={path.SEARCH} element={<Search></Search>}>
              <Route path={path.ALL} element={<SearchAll></SearchAll>} />
              <Route path={path.SONG} element={<SearchSongs></SearchSongs>} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist></SearchPlaylist>} />
            </Route>

            {/* path "/*" */}
            <Route path={path.STAR} element={<Home></Home>} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
