import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom'; // dùng để hiển thị component con của public nested route
import { Header, Loading, Player, SidebarLeft, SidebarRight } from '../../components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
  const { isLoading, scrollTop } = useSelector((state) => state.app);
  const { curSongId } = useSelector((state) => state.music);

  // const { singer } = useParams();
  const dispatch = useDispatch();

  const handleScrollTop = (e) => {
    if (e.target.scrollTop === 0) {
      dispatch(actions.zeroScrollTop(true));
    } else {
      dispatch(actions.zeroScrollTop(false));
    }
  };
  return (
    <div className="w-full relative h-screen flex flex-col bg-main-300">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] h-full flex-none">
          <SidebarLeft />
        </div>
        <div className="flex-auto relative flex flex-col">
          {isLoading && (
            <div className="absolute z-20 top-0 left-0 bottom-0 right-0 bg-main-200 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <div className="w-full h-[70px]"></div>
          <div
            className={`h-[70px] ${scrollTop ? 'bg-transparent' : 'bg-main-300'} fixed top-0 left-[240px] ${
              isShowRightSidebar ? '1400:right-[329px] right-0' : 'right-0'
            }  z-50 px-[59px] flex items-center`}
          >
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars onScroll={handleScrollTop} autoHide style={{ width: '100%', height: '100%' }}>
              <Outlet />
              <div className="w-full h-[120px]"></div>
            </Scrollbars>
          </div>
        </div>
        {isShowRightSidebar && (
          <div className="w-[330px] hidden 1400:flex h-screen flex-none animate-slide-left">
            <SidebarRight />
          </div>
        )}
      </div>
      {curSongId && (
        <div className="fixed z-50 bottom-0 left-0 right-0 h-[90px] ">
          <Player setIsShowRightSidebar={setIsShowRightSidebar} />
        </div>
      )}
    </div>
  );
};

export default Public;
