import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetArtist } from '../../apis/music';

const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
  console.log('🚀 ~ Singer ~ singer:', singer);
  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await apiGetArtist(singer);
      console.log('🚀 ~ fetchArtistData ~ res:', res);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };

    singer && fetchArtistData();
  }, [singer]);
  return (
    <div className="flex flex-col w-full ">
      <img src={artistData?.cover} alt="background" className="mt-[-70px]" />
    </div>
  );
};

export default Singer;
