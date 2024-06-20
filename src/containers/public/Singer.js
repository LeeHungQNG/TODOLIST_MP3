import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetArtist } from '../../apis/music';
import icons from '../../utils/icons';

const { BsPersonAdd, FaPlay } = icons;
const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [isHoverPlay, setIsHoverPlay] = useState(false);
  console.log('🚀 ~ Singer ~ artistData:', artistData);

  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await apiGetArtist(singer);
      console.log('🚀 ~ fetchArtistData ~ res:', res);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };

    singer && fetchArtistData();
  }, [singer]);
  return (
    <div className="flex flex-col w-full ">
      <div className="relative">
        <img src={artistData?.cover} alt="background" className="h-[400px] object-cover w-full" />
        <div className="absolute top-0 left-0 right-0 bottom-0 text-white bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent px-[60px]">
          <div className="absolute bottom-0 pb-6 px-[60px]">
            <div className="flex gap-8 items-center">
              <h1 className="text-[60px] font-bold">{artistData?.name}</h1>
              <span
                onMouseEnter={() => setIsHoverPlay(true)}
                onMouseLeave={() => setIsHoverPlay(false)}
                className="relative p-4 rounded-full text-main-500 hover:text-gray-100 cursor-pointer bg-white"
              >
                <div className="w-[22px] h-[22px]"></div>
                {isHoverPlay && <span className="absolute top-[-1px] left-[-1px] bottom-[-1px] right-[-1px] bg-main-500 rounded-full animate-scale-up-center"></span>}
                <span className="absolute p-4 top-0 left-0 bottom-0 right-0 z-50">
                  <FaPlay size={22} />
                </span>
              </span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm font-medium text-gray-300">{`${Number(artistData?.totalFollow.toFixed(1)).toLocaleString()} người quan tâm`}</span>
              <button type="button" className="bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1">
                <span>
                  <BsPersonAdd />
                </span>
                <span className="text-xs opacity-70">QUAN TÂM</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singer;
