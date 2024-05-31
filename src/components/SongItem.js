import React, { memo } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
const SongItem = ({ thumbnail, artistsNames, title, releaseDate }) => {
  return (
    <div className="w-[30%] flex items-center gap-[10px] flex-auto p-[10px] hover:bg-main-200 rounded-md cursor-pointer">
      <img src={thumbnail} alt="thumbnail" className="w-[60px] h-[60px] object-cover rounded-md" />
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-xs text-gray-700">{artistsNames}</span>
        <span className="text-xs text-gray-700">{moment(releaseDate * 1000).fromNow()}</span>
      </div>
    </div>
  );
};

export default memo(SongItem);
