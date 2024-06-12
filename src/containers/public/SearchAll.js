import React from 'react';
import { useSelector } from 'react-redux';
import { handleNumber } from '../../utils/fn';
import { SongItem, List, SectionItem, Artist } from '../../components';

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  console.log('🚀 ~ SearchAll ~ searchData:', searchData);
  return (
    <div className="w-full flex flex-col px-[60px] gap-[30px] ">
      <div className="flex flex-col">
        <div className="text-xl mb-5 font-bold">Nổi bật</div>
        <div className="flex gap-7">
          {searchData?.top && (
            <div className="p-[10px] flex-1 bg-main-200 rounded-md flex gap-4 items-center cursor-pointer">
              <img src={searchData?.top?.thumbnail} alt="thumbnail" className={`w-[84px] h-[84px] object-cover ${searchData?.top?.objectType === 'artist' && 'rounded-full'}`} />
              <div className="flex flex-col">
                <span className="mb-[6px]">{searchData.top.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
                <span className="text-sm font-semibold ">{searchData.top.title || searchData.top.name}</span>
                {searchData.top.objectType === 'artist' && <span>{`${handleNumber(searchData.artists[0]?.totalFollow)} quan tâm`}</span>}
              </div>
            </div>
          )}
          {searchData?.songs
            ?.filter((item, index) => [...Array(2).keys()].some((i) => i === index))
            ?.map((item) => (
              <div key={item.encodeId} className="flex-1">
                <SongItem thumbnail={item.thumbnail} sid={item.encodeId} title={item.title} artistsNames={item.artistsNames} size="w-[84px] h-[84px]" style="bg-main-200" />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-5">Bài hát</h3>
        <div className="flex justify-between w-full flex-wrap">
          {searchData?.songs?.map((item, index) => (
            <div key={index} className={`flex-auto w-[45%] ${index % 2 !== 0 ? 'pl-4' : 'pr-4'}`}>
              <List songData={item} isHideAlbum />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-5">Playlist/Album</h3>
        <div className="flex items-start justify-between gap-[28px]">
          {searchData?.playlists
            ?.filter((i, index) => index <= 4)
            ?.map((item, index) => (
              <SectionItem
                key={index}
                thumbnailM={item?.thumbnailM}
                title={item?.title}
                artistsNames={item?.artistsNames}
                link={item?.link}
                sortDescription={item?.sortDescription}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-5">Nghệ sĩ</h3>
        <div className="flex gap-[28px]">
          {searchData?.artists
            ?.filter((i, index) => index <= 4)
            ?.map((item, index) => (
              <Artist key={item.id} title={item?.name} image={item?.thumbnailM} follower={item?.totalFollow} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
