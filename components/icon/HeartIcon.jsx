import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function HeartTabIcon({ width, height, color }) {
  return (
    <Svg
      width={width ? width : 27}
      height={height ? height : 24}
      viewBox="0 0 27 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M19.783 0c-1.28 0-2.536.332-3.64.96A7.109 7.109 0 0013.5 3.577 7.108 7.108 0 0010.856.96 7.363 7.363 0 007.216 0a7.718 7.718 0 00-5.148 2.329A7.31 7.31 0 000 7.47C0 17.207 13.5 24 13.5 24S27 17.211 27 7.471a7.31 7.31 0 00-2.069-5.143A7.718 7.718 0 0019.783 0z"
        fill={color}
      />
    </Svg>
  );
}

export default HeartTabIcon;
