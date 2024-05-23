import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as apis from '../apis';
import icons from '../utils/icons';

const { FaHeart, FaRegHeart, HiOutlineDotsHorizontal, CiRepeat, MdSkipNext, MdSkipPrevious, TfiControlShuffle, FaPlay, FaPause } = icons;

const Player = () => {
  const audioEl = new Audio();

  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);

  useEffect(() => {
    const fetchDetailSong = async () => {
      // const response = await apis.apiGetDetailSong(curSongId);
      const [res1, res2] = await Promise.all([apis.apiGetDetailSong(curSongId), apis.apiGetSong(curSongId)]);
      console.log('🚀 ~ fetchDetailSong ~ res2:', res2);
      console.log('🚀 ~ fetchDetailSong ~ res1:', res1);

      if (res1?.data?.err === 0) {
        setSongInfo(res1?.data?.data);
      }
      if (res2?.data?.err === 0) {
        setSource(res1?.data?.data['128']);
      }
    };
    fetchDetailSong();
  }, [curSongId]);
  console.log('🚀 ~ Player ~ songInfo:', songInfo);

  useEffect(() => {
    // audioEl.play();
  }, [curSongId]);

  const handleTogglePlayMusic = () => {};

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-4 items-center">
        <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 object-cover rounded-md" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700 text-sm">{songInfo?.title}</span>
          <span className="text-xs text-gray-500">{songInfo?.artistsNames}</span>
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
      <div className="w-[40%] flex-auto border flex gap-2 py-2 flex-col items-center justify-center border-red-500">
        <div className="flex gap-8 items-center justify-center">
          <span title="Bật phát ngẫu nhiên" className="cursor-pointer">
            <TfiControlShuffle size={24} />
          </span>
          <span className="cursor-pointer">
            <MdSkipPrevious size={28} />
          </span>
          <span onClick={handleTogglePlayMusic} className="p-2 flex items-center border border-gray-700 rounded-full cursor-pointer hover:text-main-500">
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={28} />
          </span>
          <span title="Bật phát lại tất cả" className="cursor-pointer">
            <CiRepeat size={24} />
          </span>
        </div>
        <div>Progress bar</div>
      </div>
      <div className="w-[30%] flex-auto border border-red-500">Volume</div>
    </div>
  );
};

export default Player;
