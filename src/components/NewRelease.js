import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SongItem from './SongItem';

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActived, setIsActived] = useState(0);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    isActived ? setSongs(newRelease?.items?.others) : setSongs(newRelease?.items?.vPop);
  }, [isActived, newRelease]);
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{newRelease?.title}</h3>
        <span className="text-xs uppercase">Tất cả</span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <button
          onClick={() => setIsActived(0)}
          type="button"
          className={`py-1 px-4 rounded-l-full border border-gray-400 rounded-r-full ${isActived === 0 ? 'bg-main-500 text-white' : 'bg-transparent'}`}
        >
          VIỆT NAM
        </button>
        <button
          onClick={() => setIsActived(1)}
          type="button"
          className={`py-1 px-4 rounded-l-full border border-gray-400 rounded-r-full ${isActived === 1 ? 'bg-main-500 text-white' : 'bg-transparent'}`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full justify-between">
        {songs
          ?.filter((item, index) => index < 12)
          ?.map((item) => (
            <div key={item?.encodeId} className="w-[45%] min-[1024px]:w-[30%]">
              <SongItem
                thumbnail={item?.thumbnail}
                artistsNames={item?.artistsNames}
                title={item?.title}
                releaseDate={item?.releaseDate}
                sid={item?.encodeId}
                size="w-[40px] h-[40px]"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewRelease;
