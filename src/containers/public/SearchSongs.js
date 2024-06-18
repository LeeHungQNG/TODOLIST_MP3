import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { Lists } from '../../components';
const SearchSongs = () => {
  const { searchData } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  console.log('🚀 ~ SearchSongs ~ searchData:', searchData);
  useEffect(() => {
    dispatch(actions.getSearchSongs(searchData?.top?.id));
  }, [searchData]);
  return (
    <div className="w-full px-[60px]">
      <Lists isHideTime={true} />
    </div>
  );
};

export default SearchSongs;
