import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as apis from '../apis';
import icons from '../utils/icons';
import * as actions from '../store/actions';
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingSong from './LoadingSong';
const {
  FaHeart,
  FaRegHeart,
  HiOutlineDotsHorizontal,
  CiRepeat,
  MdSkipNext,
  MdSkipPrevious,
  TfiControlShuffle,
  FaPlay,
  FaPause,
  PiRepeatOnce,
  BsMusicNoteList,
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
} = icons;

var intervalId;
const Player = ({ setIsShowRightSidebar }) => {
  const dispatch = useDispatch();
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);

  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [curSeconds, setCurSeconds] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [volume, setVolume] = useState(100);
  const [isHoverVolume, setIsHoverVolume] = useState(false);

  const thumbRef = useRef();
  const trackRef = useRef();
  const volumeRef = useRef();

  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false);
      // const response = await apis.apiGetDetailSong(curSongId);
      const [res1, res2] = await Promise.all([apis.apiGetDetailSong(curSongId), apis.apiGetSong(curSongId)]);
      setIsLoadedSource(true);
      if (res1?.data?.err === 0) {
        setSongInfo(res1?.data?.data);
        dispatch(actions.setCurSongData(res1?.data?.data));
      }
      if (res2?.data?.err === 0) {
        audio.pause();
        setAudio(new Audio(res2?.data?.data['128']));
      } else {
        try {
          audio.pause();
          setAudio(new Audio());
          dispatch(actions.play(false));
          toast.warn(res2?.data.msg);
          setCurSeconds(0);
          thumbRef.current.style.cssText = `right: 100%`;
        } catch (error) {
          toast.error(error);
        }
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent = Math.round((audio?.currentTime * 10000) / songInfo?.duration) / 100; // làm tròn số thập phân nhân cho 10000
        if (thumbRef.current) {
          thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        }
        setCurSeconds(Math.round(audio?.currentTime));
      }, 200);
    }
    // Clean up the interval when the component is unmounted or dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);

  useEffect(() => {
    audio.volume = volume / 100; // audio volume run 0 -> 1
  }, [volume]);

  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.style.cssText = `right:${100 - volume}%`;
    }
  }, [volume]);

  const handleTogglePlayMusic = () => {
    if (isPlaying && !audio.paused) {
      audio.pause();
      dispatch(actions.play(false));
    } else if (audio.paused && !isPlaying) {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgressBar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent = Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) / 100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurSeconds(Math.round(percent * songInfo.duration) / 100);
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item?.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item?.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleRepeatOne = () => {
    try {
      audio.play();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1; // vd length = 5 -> index from 0 -> 4 -> - 1
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-4 items-center">
        {songInfo?.thumbnail && <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 object-cover rounded-md" />}
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
      <div className="w-[40%] flex-auto flex gap-2 py-2 flex-col items-center justify-center">
        <div className="flex gap-8 items-center justify-center">
          <span title="Bật phát ngẫu nhiên" className={`${isShuffle && 'text-purple-600'} cursor-pointer`} onClick={() => setIsShuffle((prev) => !prev)}>
            <TfiControlShuffle size={24} />
          </span>
          <span className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`} onClick={handlePrevSong}>
            <MdSkipPrevious size={28} />
          </span>
          <span onClick={() => handleTogglePlayMusic()} className="p-2 flex items-center border border-gray-700 rounded-full cursor-pointer hover:text-main-500">
            {!isLoadedSource ? <LoadingSong /> : isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </span>
          <span className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`} onClick={handleNextSong}>
            <MdSkipNext size={28} />
          </span>
          <span title="Bật phát lại tất cả" className={`${repeatMode && 'text-purple-600'} cursor-pointer`} onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}>
            {repeatMode === 1 ? <PiRepeatOnce size={24} /> : <CiRepeat size={24} />}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-3 text-xs">
          <span>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
          <div ref={trackRef} className="w-3/5 h-[3px] hover:h-[8px] cursor-pointer rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]" onClick={handleClickProgressBar}>
            <div ref={thumbRef} className="absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#0e8080]"></div>
          </div>
          <span>{songInfo?.duration && moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
        </div>
      </div>
      <div className="w-[30%] flex items-center justify-end gap-4 flex-auto">
        <div className="flex gap-2 items-center" onMouseEnter={() => setIsHoverVolume(true)} onMouseLeave={() => setIsHoverVolume(false)}>
          <span className="cursor-pointer" onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
            {+volume >= 50 ? <HiOutlineVolumeUp /> : +volume === 0 ? <HiOutlineVolumeOff /> : <HiOutlineVolumeUp />}
          </span>
          <div className={`w-[130px] h-1 bg-white rounded-l-full rounded-r-full ${isHoverVolume ? 'hidden' : 'relative'}`}>
            <div ref={volumeRef} className="absolute top-0 left-0 bottom-0 right-0 bg-main-500 rounded-l-full rounded-r-full"></div>
          </div>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            className={`w-[130px] ${isHoverVolume ? 'inline' : 'hidden'}`}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <span onClick={() => setIsShowRightSidebar((prev) => !prev)} className="p-1 rounded-sm bg-main-500 opacity-90 hover:opacity-100 cursor-pointer">
          <BsMusicNoteList size={20} />
        </span>
      </div>
    </div>
  );
};

export default Player;
