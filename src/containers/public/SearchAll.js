import React from 'react';
import { useSelector } from 'react-redux';
import { handleNumber } from '../../utils/fn';
const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  console.log('🚀 ~ SearchAll ~ searchData:', searchData);
  return (
    <div className="w-full flex flex-col px-[60px]">
      <div className="flex flex-col">
        <div className="text-xl mb-5 font-bold">Nổi bật</div>
        <div className="flex gap-7">
          {searchData?.top && (
            <div className="p-[10px] flex-1 bg-main-200 rounded-md flex gap-4 items-center">
              <img src={searchData?.top?.thumbnail} alt="thumbnail" className={`w-[84px] h-[84px] object-cover ${searchData?.top?.objectType === 'artist' && 'rounded-full'}`} />
              <div className="flex flex-col">
                <span className="mb-[6px]">{searchData.top.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
                <span className="text-sm font-semibold ">{searchData.top.title || searchData.top.name}</span>
                {searchData.top.objectType === 'artist' && <span>{`${handleNumber(searchData.artists[0]?.totalFollow)} quan tâm`}</span>}
              </div>
            </div>
          )}
          <div className="flex-1">SONG 1</div>
          <div className="flex-1">SONG 2</div>
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
