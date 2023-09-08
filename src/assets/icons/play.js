import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {props.isPlaying ? (
        <Path
          d="M4.5 2.25h9v31.5h-9V2.25zM22.5 2.25h9v31.5h-9V2.25z"
          fill="#fff"
        />
      ) : (
        <Path
          d="M29.478 15.076c.696.41.696 1.437 0 1.848L7.565 29.855C6.87 30.267 6 29.753 6 28.932V3.068c0-.82.87-1.334 1.565-.924l21.913 12.932z"
          fill="#fff"
        />
      )}
    </Svg>
  );
}

export default SvgComponent;
