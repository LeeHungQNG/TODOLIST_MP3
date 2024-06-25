import React, { memo } from 'react';

const Button = ({ text, style, icon }) => {
  return (
    <button type="button" className={style ? style : 'py-1 px-4 rounded-l-full rounded-r-full border bg-transparent'}>
      {text && <span>{text}</span>}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default memo(Button);
