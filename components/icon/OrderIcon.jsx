import * as React from "react"
import Svg, { Path } from "react-native-svg"

function OrderTabIcon({width, height, color}) {
  return (
    <Svg
      width={width ? width : 22}
      height={height ? height : 24}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M16.122 0H5.88C2.163 0 0 2.136 0 5.796v12.396C0 21.912 2.163 24 5.879 24h10.243C19.898 24 22 21.912 22 18.192V5.796C22 2.136 19.898 0 16.122 0z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.209 5.58v.012a.945.945 0 00-.953.936c0 .516.426.936.953.936h3.653c.527 0 .955-.42.955-.95a.946.946 0 00-.955-.934H6.21zm9.582 7.308H6.21a.945.945 0 01-.953-.936c0-.516.426-.937.953-.937h9.582c.526 0 .953.42.953.937a.946.946 0 01-.953.936zm0 5.484H6.21a.956.956 0 01-.917-.432.94.94 0 010-1.008.964.964 0 01.917-.444h9.582a.946.946 0 010 1.884z"
        fill="#FE724C"
      />
    </Svg>
  )
}

export default OrderTabIcon 