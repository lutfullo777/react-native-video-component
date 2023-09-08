import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.423 7.661V5.693c0-2.303-2.038-4.171-4.55-4.171-2.514-.01-4.56 1.848-4.57 4.153V7.66"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M12.683 18.48h-7.64c-2.095 0-3.793-1.556-3.793-3.477v-3.931c0-1.92 1.698-3.476 3.792-3.476h7.641c2.094 0 3.792 1.555 3.792 3.476v3.931c0 1.92-1.698 3.476-3.792 3.476z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.863 12.02v2.035"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
