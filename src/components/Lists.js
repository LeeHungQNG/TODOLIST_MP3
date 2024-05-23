import React, { memo } from 'react';
import List from './List';

const Lists = ({ songs, totalDuration }) => {
  console.log({ songs, totalDuration });
  return (
    <div className="w-full flex flex-col text-xs text-gray-600">
      <div className="flex items-center justify-between p-[10px] font-semibold">
        <span>Bai hat</span>
        <span>Album</span>
        <span>Thoi gian</span>
      </div>
      <div>
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(Lists);
