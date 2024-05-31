import React, { useEffect } from 'react';
import { Section, Slider } from '../../components';
import * as apis from '../../apis';
import { useSelector } from 'react-redux';
const Home = () => {
  const { friday, chill, top100, remix, albumHot } = useSelector((state) => state.app);
  return (
    <div className="overflow-y-auto w-full">
      <Slider />
      <Section data={friday} />
      <Section data={chill} />
      <Section data={remix} />
      <Section data={top100} />
      <Section data={albumHot} />
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
