import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11 20.167a9.167 9.167 0 100-18.333"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M11 20.167a9.167 9.167 0 110-18.333"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="4 3"
      />
      <Path
        d="M14.13 10.03c.716.423.716 1.518 0 1.941l-4.328 2.555c-.696.411-1.552-.124-1.552-.97v-5.11c0-.847.856-1.382 1.552-.97l4.327 2.554z"
        stroke="#fff"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default SvgComponent;
