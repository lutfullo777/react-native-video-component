import * as React from 'react';
import Svg, {Rect, Text} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={25}
      height={18}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Text
        fontSize="7"
        fontWeight="bold"
        x="12"
        textAnchor="middle"
        y="11"
        fill={props.quality === props.active ? '#B92325' : '#fff'}>
        {props.quality}
      </Text>
      <Rect
        x={0.75}
        y={0.75}
        width={22}
        height={16.5}
        rx={2.25}
        stroke={props.quality === props.active ? '#B92325' : '#fff'}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

SvgComponent.defaultProps = {
  color: '#fff',
  quality: 'fhd',
};

export default SvgComponent;
