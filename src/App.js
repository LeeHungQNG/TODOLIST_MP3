import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Public } from './containers/public';
import { Route, Routes } from 'react-router-dom';
import path from './utils/path';
import * as actions from './store/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getHome());
  }, [dispatch]);

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
