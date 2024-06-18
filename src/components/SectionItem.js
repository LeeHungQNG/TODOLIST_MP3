import React, { memo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../utils/icons';

const { FaRegHeart, HiOutlineDotsHorizontal, FaPlay } = icons;
const SectionItem = ({ link, thumbnailM, title, data, artistsNames, sortDescription }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const imageRef = useRef();
  const handleHover = () => {
    setIsHover(true);
    imageRef.current.classList?.add('animate-scale-up-image');
    imageRef.current.classList?.remove('animate-scale-down-image');
  };

  const handleLeave = () => {
    setIsHover(false);
    imageRef.current.classList?.add('animate-scale-down-image');
    imageRef.current.classList?.remove('animate-scale-up-image');
  };
  return (
    <div
      onClick={() => {
        navigate(link?.split('.')[0], { state: { playAlbum: false } });
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="flex flex-col gap-3 w-[15%] text-sm p-4 cursor-pointer justify-evenly"
    >
      <div className="w-full relative overflow-hidden rounded-lg">
        {isHover && (
          <div className="absolute z-40 top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-4">
            <span>
              <FaRegHeart size={25} />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation(); //  Vì khi click vào icon sẽ bị nổi bọt lấy event onclick thẻ cha nên phải có hàm này chống nổi bọt ở thẻ con
                navigate(link?.split('.')[0], { state: { playAlbum: true } });
              }}
              className="p-3 border border-white rounded-full"
            >
              <FaPlay size={25} />
            </span>
            <span>
              <HiOutlineDotsHorizontal size={25} />
            </span>
          </div>
        )}
        <img ref={imageRef} src={thumbnailM} alt="thumbnailM" className="w-full h-auto rounded-lg" />
      </div>
      <span className="flex flex-col">
        <span className="font-semibold">{title?.length > 30 ? title.slice(0, 30) + '...' : title}</span>
        {data?.sectionId === 'h100' || data?.sectionId === 'hAlbum' || artistsNames ? (
          <span>{artistsNames}</span>
        ) : (
          <span>{sortDescription?.length >= 40 ? `${sortDescription?.slice(0, 40)}...` : sortDescription}</span>
        )}
      </span>
    </div>
  );
};

export default memo(SectionItem);
