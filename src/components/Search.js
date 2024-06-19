import React, { useState } from 'react';
import icons from '../utils/icons';
import { useNavigate, createSearchParams, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import path from '../utils/path';
import { IoCloseSharp } from 'react-icons/io5';
const { GoSearch } = icons;
const Search = () => {
  const [keywork, setKeyword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singer } = useParams();

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keywork));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keywork,
        }).toString(),
      });
    }
  };

  return (
    <div className="w-full relative flex items-center">
      {keywork && (
        <span onClick={() => setKeyword('')} className="absolute right-[16px] cursor-pointer">
          <IoCloseSharp />
        </span>
      )}
      <span className={`h-10 ${singer ? 'bg-[rgba(0,0,0,0.2)]' : 'bg-[#DDE4E4]'} pl-4 flex items-center justify-center rounded-l-[20px] text-gray-500`}>
        <GoSearch size={20} />
      </span>
      <input
        value={keywork}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
        type="text"
        className={`outline-none w-full ${singer ? 'bg-[rgba(0,0,0,0.2)]' : 'bg-[#DDE4E4]'} px-4 py-2 rounded-r-[20px] h-10 text-gray-500`}
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát,... "
      />
    </div>
  );
};

export default Search;
