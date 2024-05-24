import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as apis from '../apis';
import icons from '../utils/icons';
import * as actions from '../store/actions';
import moment from 'moment';

const { FaHeart, FaRegHeart, HiOutlineDotsHorizontal, CiRepeat, MdSkipNext, MdSkipPrevious, TfiControlShuffle, FaPlay, FaPause } = icons;

var intervalId;
const Player = () => {
  const dispatch = useDispatch();
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [curSeconds, setCurSeconds] = useState(0);
  const thumbRef = useRef();
  useEffect(() => {
    const fetchDetailSong = async () => {
      // const response = await apis.apiGetDetailSong(curSongId);
      const [res1, res2] = await Promise.all([apis.apiGetDetailSong(curSongId), apis.apiGetSong(curSongId)]);
      console.log('🚀 ~ fetchDetailSong ~ res1:', res1);
      console.log('🚀 ~ fetchDetailSong ~ res2:', res2);

      if (res1?.data?.err === 0) {
        setSongInfo(res1?.data?.data);
      }
      if (res2?.data?.err === 0) {
        audio.pause();
        setAudio(new Audio(res2?.data?.data['128']));
      }
    };
    fetchDetailSong();
  }, [curSongId]);
  console.log('🚀 ~ Player ~ songInfo:', songInfo);

  useEffect(() => {
    if (isPlaying) {
      intervalId = setInterval(() => {
        let percent = Math.round((audio.currentTime * 10000) / songInfo.duration) / 100; // làm tròn số thập phân nhân cho 10000
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    } else {
      intervalId && clearInterval(intervalId);
    }
  }, [isPlaying]);

  useEffect(() => {
    audio.load();
    if (isPlaying) audio.play();
  }, [audio]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

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
        <div className="w-full flex items-center justify-center gap-3 text-xs">
          <span>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
          <div className="w-3/5 h-[3px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]">
            <div ref={thumbRef} className="absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full bg-[#0e8080]"></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
        </div>
      </div>
      <div className="w-[30%] flex-auto border border-red-500">Volume</div>
    </div>
  );
};

export default Player;
