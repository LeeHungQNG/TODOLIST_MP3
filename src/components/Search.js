import React, { useState } from 'react';
import icons from '../utils/icons';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import path from '../utils/path';

const { GoSearch } = icons;
const Search = () => {
  const [keywork, setKeyword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className="w-full flex items-center">
      <span className="h-10 bg-[#DDE4E4] pl-4 flex items-center justify-center rounded-l-[20px] text-gray-500">
        <GoSearch size={20} />
      </span>
      <input
        value={keywork}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
        type="text"
        className="outline-none w-full bg-[#DDE4E4] px-4 py-2 rounded-r-[20px] h-10 text-gray-500"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát,... "
      />
    </div>
  );
};

export default Search;
