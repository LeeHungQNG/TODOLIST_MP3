import React, { useEffect } from 'react';
import { NewRelease, Section, Sliders, ChartSection } from '../../components';
import * as apis from '../../apis';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../../components';
const Home = () => {
  const { friday, chill, top100, remix, albumHot, weekChart } = useSelector((state) => state.app);
  const { chart, rank } = useSelector((state) => state.app);

  return (
    <>
      {friday && chill && top100 && remix && albumHot && weekChart ? (
        <div className="overflow-y-auto w-full">
          <div className="w-full h-[70px]"></div>
          <Sliders />
          <Section data={friday} />
          <NewRelease />
          <Section data={chill} />
          <Section data={remix} />
          <ChartSection />
          <div className="flex mt-12 px-[43px] items-center w-full">
            {weekChart?.map((item) => (
              <Link to={item?.link.split('.')[0]} key={item.link} className="flex-1 px-4">
                <img src={item.cover} alt="cover" className="w-full object-cover rounded-md" />
              </Link>
            ))}
          </div>
          <Section data={top100} />
          <Section data={albumHot} />
          <div className="w-full h-[500px]"></div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Home;
