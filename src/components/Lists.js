import React, { memo } from 'react';
import List from './List';
import moment from 'moment';
import icons from '../utils/icons';
import { useSelector } from 'react-redux';

const { LuDot } = icons;

const Lists = ({ totalDuration }) => {
  // console.log({ songs, totalDuration });
  const { songs } = useSelector((state) => state.music);
  return (
    <div className="w-full flex flex-col text-xs text-gray-600">
      <div className="flex items-center justify-between p-[10px] font-semibold">
        <span>Bài hát</span>
        <span>Album</span>
        <span>Thời gian</span>
      </div>
      <div>
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
      <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
        <span>{`${songs?.length} bài hát`}</span>
        <LuDot size={24} />
        <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span>
      </span>
    </div>
  );
};

export default memo(Lists);
