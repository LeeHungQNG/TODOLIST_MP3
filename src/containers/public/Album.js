import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '../../apis';
import moment from 'moment';

const Album = () => {
  const [playlistData, setPlaylistData] = useState({});
  const { pid } = useParams();
  console.log({ pid });

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid);
      console.log('🚀 ~ fetchDetailPlaylist ~ response:', response);
      if (response?.data?.err === 0) {
        setPlaylistData(response?.data?.data);
      }
    };
    fetchDetailPlaylist();
  }, [pid]);
  return (
    <div className="flex gap-5 w-full px-[59px]">
      <div className="flex-none w-1/4 border border-red-500 flex flex-col items-center gap-2">
        <img src={playlistData?.thumbnail} alt="thumbnail" className="w-full object-cover rounded-md shadow-md" />
        <h3 className="text-[20px] font-bold text-gray-800">{playlistData?.title}</h3>
        <div className="flex flex-col items-center gap-1">
          <span className="flex gap-1 items-center text-gray-500 text-xs">
            <span>Cập nhật:</span>
            <span>{moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}</span>
          </span>
          <span className="flex gap-1 items-center text-gray-500 text-xs">{playlistData?.artistsNames}</span>
          <span className="flex gap-1 items-center text-gray-500 text-xs">{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>
        </div>
      </div>
      <div className="flex-auto border border-blue-500">List Song</div>
    </div>
  );
};

export default Album;
