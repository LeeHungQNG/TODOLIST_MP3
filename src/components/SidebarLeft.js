import React from 'react';
import logo from '../assets/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { sidebarMenu } from '../utils/menu';
import path from '../utils/path';

const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-4 items-center';
const activeStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-4 items-center';

const SidebarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col bg-main-200">
      <div onClick={() => navigate(path.HOME)} className="w-full h-[70px] px-[25px] py-[15px] flex items-center justify-start cursor-pointer">
        <img src={logo} alt="logo zingmp3" className="w-[120px] h-[40px]" />
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          // Navlink có thêm props active để phân biệt thẻ đang active -> true or false
          <NavLink key={item.path} end={item.end} to={item.path} className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}>
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
