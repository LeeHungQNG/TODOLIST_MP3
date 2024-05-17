import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as apis from '../apis';
import icons from '../utils/icons';

const { FaHeart, FaRegHeart, HiOutlineDotsHorizontal } = icons;

const Player = () => {
  const { curSongId } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const response = await apis.getDetailSong(curSongId);
      if (response?.data?.error === 0) {
        setSongInfo(response.data);
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto border border-red-500 flex gap-4 items-center">
        <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 object-cover rounded-md" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700 text-sm">{songInfo?.title} ngay trai tim roi le</span>
          <span className="text-xs text-gray-500">{songInfo?.artistsNames} nguyen dinh vu</span>
        </div>
        <div className="flex gap-[10px] pl-2">
          <span>
            <FaRegHeart size={16} />
          </span>
          <span>
            <HiOutlineDotsHorizontal size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto border border-red-500">Main Player</div>
      <div className="w-[30%] flex-auto border border-red-500">Volume</div>
    </div>
  );
};

export default Player;
