import React from 'react';
import { Outlet } from 'react-router-dom';

const Search = () => {
  return (
    <div>
      Search
      <div>
        {/* Outlet đại diện cho thằng con khi link url cha map với url con -> 'tim-kiem/bai-hat' */}
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
