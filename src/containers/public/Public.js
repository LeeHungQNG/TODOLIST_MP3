import React from 'react';
import { Outlet } from 'react-router-dom'; // dùng để hiển thị component con của public nested route
const Public = () => {
  return (
    <div>
      Public
      <Outlet />
    </div>
  );
};

export default Public;
