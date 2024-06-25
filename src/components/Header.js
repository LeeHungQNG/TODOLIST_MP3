import React from 'react';
import icons from '../utils/icons';
import { Search } from './';
import { useNavigate, useParams } from 'react-router-dom';

const { FaArrowLeftLong, FaArrowRightLong } = icons;
const Header = () => {
  const { singer } = useParams();
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-6 w-full items-center">
        <div className="flex gap-6 cursor-pointer">
          <span onClick={() => navigate(-1)}>
            <FaArrowLeftLong size={24} color={singer ? 'gray' : ' black'} />
          </span>
          <span onClick={() => navigate(1)}>
            <FaArrowRightLong size={24} color={singer ? 'gray' : ' black'} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Header;
