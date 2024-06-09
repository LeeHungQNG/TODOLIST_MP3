import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // dùng để hiển thị component con của public nested route
import { Header, Loading, Player, SidebarLeft, SidebarRight } from '../../components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
  const { isLoading } = useSelector((state) => state.app);
  console.log('🚀 ~ Public ~ isLoading:', isLoading);
  return (
    <div className="w-full relative h-screen flex flex-col bg-main-300">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] h-full flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto relative flex flex-col border border-red-500">
          {isLoading && (
            <div className="absolute z-20 top-0 left-0 bottom-0 right-0 bg-main-200 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <div className="h-[70px] flex-none px-[59px] flex items-center">
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        {isShowRightSidebar && (
          <div className="w-[330px] hidden 1600:flex h-screen flex-none border border-green-500 animate-slide-left">
            <SidebarRight />
          </div>
        )}
      </div>
      <div className="fixed z-50 bottom-0 left-0 right-0 h-[90px] ">
        <Player setIsShowRightSidebar={setIsShowRightSidebar} />
      </div>
    </div>
  );
};

export default Public;
