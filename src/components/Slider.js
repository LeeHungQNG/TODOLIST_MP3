import React from 'react';
import { useSelector } from 'react-redux';

const Slider = () => {
  const { banner } = useSelector((state) => state.app);
  console.log('🚀 ~ Slider ~ banner:', banner);
  return (
    <div className="flex flex-col">
      {banner?.map((item) => (
        <img key={item.encodeId} className="flex-1 object-contain" src={item.banner} alt="banner"></img>
      ))}
    </div>
  );
};

export default Slider;
