import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { RankList } from '../../components';
import icons from '../../utils/icons';

const { FaPlay } = icons;
const notActivedStyle = 'text-[24px] py-[12px] text-black font-bold uppercase';
const activedStyle = 'text-[24px] py-[12px] text-main-500 font-bold uppercase border-b-2 border-[#0E8080]';

const WeekRank = ({ weekChart }) => {

  const { pid } = useParams();
 

  useEffect(() => {}, []);

  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(206,217,217,0.9)]"></div>
        <div className="absolute top-0 left-0 bottom-1/2 right-0 px-[60px] mt-8 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <h3 className="font-bold text-[40px] text-main-500">Bảng xếp hạng tuần</h3>
            <span className="p-3 rounded-full bg-[#0e8080] hover:opacity-80">
              <FaPlay size={20} color="white" />
            </span>
          </div>
          <div className="flex gap-[40px]">
            {weekChart?.map((item) => (
              <NavLink
                key={item.chartId}
                className={({ isActive }) => {
                  return isActive ? activedStyle : notActivedStyle;
                }}
                to={item?.link.split('.')[0]}
              >
                {item?.country === 'vn' ? 'Việt Nam' : item?.country === 'us' ? 'US-UK' : item?.country === 'korea' ? 'K-Pop' : ''}
              </NavLink>
            ))}
          </div>
          <div className="pb-8 w-full">
            <RankList number={100} data={weekChart?.find((item) => item?.link?.includes(pid))?.items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekRank;
