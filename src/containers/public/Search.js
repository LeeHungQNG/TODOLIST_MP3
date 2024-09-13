import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { searchMenu } from '../../utils/menu';
import { useSelector } from 'react-redux';
const notActiveStyle = 'px-4 hover:text-main-500 cursor-pointer';
const activeStyle = 'px-4 hover:text-main-500 cursor-pointer border-b-2 border-green-900 h-[52px] text-main-500 flex items-center';

const Search = () => {
  // const [searchParams] = useSearchParams();
  // useEffect(() => {
  //   const params = [];
  //   for (let entry of searchParams.entries()) {
  //     params.push(entry);
  //   }
  // }, [searchParams]);

  const { keyword } = useSelector((state) => state.music);
 
  return (
    <div className="w-full">
      <div className="flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pl-[60px] pb-1">
        <span className="text-[24px] font-bold pr-6 border-r border-gray-400">Kết quả tìm kiếm</span>
        <div className="flex items-center">
          {searchMenu.map((item) => (
            <NavLink key={item.path} to={`${item.path}?q=${keyword.replace(' ', '+')}`} className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}>
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full">
        {/* Outlet đại diện cho thằng con khi link url cha map với url con -> 'tim-kiem/bai-hat' */}
        <Outlet />
      </div>
      <div className="w-full h-[120px]"></div>
    </div>
  );
};

export default Search;
