import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function HomeTabIcon({ width, height, color }) {
  return (
    <Svg
      width={width ? width : 30}
      height={height ? height : 30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11 27H8.333C5.388 27 3 24.519 3 21.458V12.74c0-1.938.974-3.735 2.569-4.74l6.667-4.198a5.162 5.162 0 015.528 0l6.667 4.199C26.026 9.005 27 10.802 27 12.74v8.717C27 24.518 24.612 27 21.667 27H19m-8 0v-5.542c0-2.295 1.79-4.156 4-4.156s4 1.86 4 4.156V27m-8 0h8"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeTabIcon;
