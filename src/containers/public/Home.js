import React, { useEffect } from 'react';
import { NewRelease, Section, Slider, ChartSection } from '../../components';
import * as apis from '../../apis';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Home = () => {
  const { friday, chill, top100, remix, albumHot, weekChart } = useSelector((state) => state.app);
  const { chart, rank } = useSelector((state) => state.app);
  console.log('🚀 ~ Home ~ chart, rank:', { chart, rank });

  return (
    <div className="overflow-y-auto w-full">
      <Slider />
      <Section data={friday} />
      <NewRelease />
      <Section data={chill} />
      <Section data={remix} />
      <ChartSection />
      <Section data={top100} />
      <Section data={albumHot} />
      <div className="flex mt-12 px-[43px] items-center w-full">
        {weekChart?.map((item) => (
          <Link to={item?.link.split('.')[0]} key={item.link} className="flex-1 px-4">
            <img src={item.cover} alt="cover" className="w-full object-cover rounded-md" />
          </Link>
        ))}
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
