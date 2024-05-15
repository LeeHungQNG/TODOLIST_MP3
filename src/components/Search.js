import React from 'react';
import icons from '../utils/icons';

const { GoSearch } = icons;
const Search = () => {
  return (
    <div className="w-full flex items-center">
      <span className="h-10 bg-[#DDE4E4] pl-4 flex items-center justify-center rounded-l-[20px] text-gray-500">
        <GoSearch size={20} />
      </span>
      <input type="text" className="outline-none w-full bg-[#DDE4E4] px-4 py-2 rounded-r-[20px] h-10 text-gray-500" placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát,... " />
    </div>
  );
};

export default Search;
