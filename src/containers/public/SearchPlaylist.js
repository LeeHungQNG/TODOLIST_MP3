import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiGetArtist } from '../../apis';
import { Section, SectionItem } from '../../components';

const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await apiGetArtist(searchData?.top?.alias);
      if (res.data.err === 0) {
        setPlaylists(res.data.data.sections[1]);
      }
    };
    fetch();
  }, [searchData]);
  return (
    <div className="w-full flex flex-col gap-8 px-[44px]">
      <h3 className="px-4 text-lg font-bold">Playlist/Album</h3>
      <div className="flex flex-wrap items-start justify-start">
        {playlists &&
          playlists?.items?.length > 0 &&
          playlists.items?.map((item, idx) => (
            <SectionItem key={idx} thumbnailM={item.thumbnailM} title={item.title} artistsNames={item.artistsNames} sortDescription={item.sortDescription} link={item.link} />
          ))}
      </div>
    </div>
  );
};

export default SearchPlaylist;
