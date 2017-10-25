import React from 'react';
import CombinedSvg from './combinedSvg';

const Svg = ({ name, title, handleClick, ...props }) => {
  const Element = CombinedSvg[name];

  return (
    <svg
      onClick={handleClick}
      title={title}
    >
      <Element {...props} />
    </svg>
  );
};

export default Svg;

