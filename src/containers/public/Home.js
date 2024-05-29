import React, { useEffect } from 'react';
import { Section, Slider } from '../../components';
import * as apis from '../../apis';
const Home = () => {
  return (
    <div className="overflow-y-auto w-full">
      <Slider />
      <Section />
    </div>
  );
};

export default Home;
