import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SectionItem from './SectionItem';

const Section = ({ data }) => {
  // console.log('🚀 ~ Section ~ data:', data);
  // const navigate = useNavigate();
  return (
    <div className="mt-12 px-[44px] flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold pl-4">{data?.title}</h3>
        <span className="text-xs uppercase p-4">Tất cả</span>
      </div>
      <div className="flex items-start justify-between">
        {data &&
          data?.items?.length > 0 &&
          data.items
            .filter((i, index) => index <= 4)
            .map((item, idx) => (
              <SectionItem
                key={idx}
                data={data}
                thumbnailM={item.thumbnailM}
                title={item.title}
                artistsNames={item.artistsNames}
                sortDescription={item.sortDescription}
                link={item.link}
              />
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
