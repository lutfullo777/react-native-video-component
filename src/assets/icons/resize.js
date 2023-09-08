import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {props.isFull ? (
        <Path
          d="M6.47 17.53a.75.75 0 010-1.06l2.22-2.22H7.5a.75.75 0 010-1.5h3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-1.19l-2.22 2.22a.75.75 0 01-1.06 0zM16.5 11.25a.75.75 0 000-1.5h-1.19l2.22-2.22a.75.75 0 00-1.06-1.06l-2.22 2.22V7.5a.75.75 0 00-1.5 0v3c0 .414.336.75.75.75h3z"
          fill="#fff"
        />
      ) : (
        <Path
          d="M13.304 6.783c0 .432.35.782.783.782h1.241l-2.316 2.316a.783.783 0 001.107 1.107l2.316-2.316v1.241a.783.783 0 101.565 0v-3.13A.783.783 0 0017.217 6h-3.13a.783.783 0 00-.783.783zM10.988 14.119a.783.783 0 00-1.107-1.107l-2.316 2.316v-1.241a.783.783 0 10-1.565 0v3.13c0 .433.35.783.783.783h3.13a.783.783 0 100-1.565H8.672l2.316-2.316z"
          fill="#fff"
        />
      )}
      <Rect
        x={0.9}
        y={2.9}
        width={22.2}
        height={18.2}
        rx={3.1}
        stroke="#fff"
        strokeWidth={1.8}
      />
    </Svg>
  );
}

export default SvgComponent;
