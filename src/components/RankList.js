import React, { memo, useEffect, useState } from 'react';
import List from './List';

const RankList = ({ data }) => {
  const [isShowFull, setIsShowFull] = useState(false);
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    if (!isShowFull) {
      setSongs(data?.filter((item, index) => index < 10));
    } else {
      setSongs(data);
    }
  }, [isShowFull, data]);
  return (
    <div className="w-full">
      {songs?.map((item, index) => (
        <List key={item.encodeId} songData={item} isHideNode={true} order={index + 1} />
      ))}
      <div className="w-full flex items-center justify-center">
        <button
          type="button"
          className="cursor-pointer px-6 py-2 my-4 border border-[#0E8080] rounded-l-full rounded-r-full text-main-500 text-sm hover:text-white hover:bg-main-500"
          onClick={() => setIsShowFull((prev) => !prev)}
        >
          {isShowFull ? 'Xem top 10' : 'Xem top 100'}
        </button>
      </div>
    </div>
  );
};

export default memo(RankList);
