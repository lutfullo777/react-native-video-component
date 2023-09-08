import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={20}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {props.isSaved ? (
        <Path
          d="M15 19l-7-5-7 5V3a2 2 0 012-2h10a2 2 0 012 2v16z"
          fill="#fff"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <Path
          d="M15 19l-7-5-7 5V3a2 2 0 012-2h10a2 2 0 012 2v16z"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}

export default SvgComponent;
