import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetArtist } from '../../apis/music';
import icons from '../../utils/icons';
import SongItem from '../../components/SongItem';
import Section from '../../components/Section';
import { Artist } from '../../components';
import { useSelector } from 'react-redux';

const { BsPersonAdd, FaPlay } = icons;
const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [isHoverPlay, setIsHoverPlay] = useState(false);
  const ref = useRef();
  const { scrollTop } = useSelector((state) => state.app);
  // console.log('🚀 ~ Singer ~ artistData:', artistData);
  // filter((item) => item?.sectionType === 'song') => filter => trả về mảng => không chấm tới items được
  // find((item) => item?.sectionType === 'song') => find => trả về object => sẽ chấm tới items được
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

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [singer]);
  return (
    <div className="flex flex-col w-full ">
      <div ref={ref} className="relative">
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
      <div className="mt-[30px] px-[60px] w-full flex">
        <div className="w-[40%] flex-auto">
          <h3 className="font-bold text-[20px] mb-5">Mới phát hành</h3>
          <div className="flex gap-4 p-4 pr-11 bg-[#C4CDCC] rounded-md">
            <img src={artistData?.topAlbum?.thumbnail || artistData?.thumbnail} alt="thumbnail" className="w-[151px] h-[151px] object-cover rounded-md" />
            <div className="flex flex-col gap-[12px] opacity-80 text-xs text-black">
              <span>{artistData?.topAlbum?.textType}</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold opacity-100">{artistData?.topAlbum?.title}</span>
                <span>{artistData?.topAlbum?.artistsNames}</span>
              </div>
              <span>{artistData?.topAlbum?.releaseDate}</span>
            </div>
          </div>
        </div>
        <div className="w-[60%] flex-auto pl-6">
          <h3 className="font-bold text-[20px] mb-5">Bài hát nổi bật</h3>
          <div className="flex flex-wrap w-full justify-start">
            {artistData?.sections
              ?.find((item) => item?.sectionType === 'song')
              ?.items?.filter((item, index) => index < 6)
              ?.map((item) => (
                <div key={item?.encodeId} className="w-[90%] min-[1024px]:w-[50%]">
                  <div className="w-[96%] border-b border-gray-400">
                    <SongItem thumbnail={item?.thumbnail} artistsNames={item?.artistsNames} title={item?.title} sid={item?.encodeId} size="w-[40px] h-[40px]" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {artistData?.sections
        ?.filter((item) => item.sectionType === 'playlist')
        ?.map((item, index) => (
          <Section key={index} data={item} />
        ))}
      <div className="flex flex-col w-full px-[60px] mt-[12px]">
        <h3 className="text-lg font-bold mb-5">{artistData?.sections?.find((item) => item.sectionType === 'artist')?.title}</h3>
        <div className="flex gap-[28px]">
          {artistData?.sections
            ?.find((item) => item.sectionType === 'artist')
            ?.items?.filter((item, i) => i < 6)
            ?.map((item, index) => (
              <Artist key={item.id} title={item?.name} image={item?.thumbnailM} follower={item?.totalFollow} link={item?.link} />
            ))}
        </div>
      </div>
      <div className="px-[60px] mt-12">
        <h3 className="text-lg font-bold mb-5">{`Về ${artistData?.name}`}</h3>
        <div className="flex gap-8">
          <img src={artistData?.thumbnailM} alt="thumbnail" className="w-[45%] h-[275px] flex-none object-cover rounded-md " />
          <div className="flex flex-col gap-8 text-sm">
            <p dangerouslySetInnerHTML={{ __html: artistData?.biography }}></p>
            <div className="flex flex-col gap-2">
              <span className="text-[20px] font-bold">{Number(artistData?.follow?.toFixed(1)).toLocaleString()}</span>
              <span>Người quan tâm</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1000px]"></div>
    </div>
  );
};

export default Singer;
