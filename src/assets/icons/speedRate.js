import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={22}
      height={18}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {props.speed === 2 && (
        <Path
          d="M8.58 9.8l-1.04 1.112h2.2V12H5.884v-.984l1.84-1.928c.224-.235.35-.368.376-.4.07-.08.15-.205.24-.376a.961.961 0 00.136-.456.696.696 0 00-.232-.544.824.824 0 00-.584-.216c-.416 0-.858.219-1.328.656l-.648-.848c.614-.613 1.304-.92 2.072-.92.566 0 1.027.17 1.384.512.363.336.544.768.544 1.296 0 .57-.368 1.24-1.104 2.008zm2.545 2.328a.642.642 0 01-.664-.656c0-.181.064-.333.192-.456a.656.656 0 01.472-.184.61.61 0 01.448.184.606.606 0 01.192.456.642.642 0 01-.192.472.61.61 0 01-.448.184zm3.635-.032c-.528 0-.976-.144-1.344-.432-.699-.55-1.048-1.424-1.048-2.624 0-.57.082-1.077.248-1.52.17-.464.443-.835.816-1.112.373-.283.816-.424 1.328-.424.32 0 .613.053.88.16.266.107.49.256.672.448.186.187.344.41.472.672.128.256.221.533.28.832.058.299.088.613.088.944 0 .33-.03.645-.088.944a3.383 3.383 0 01-.28.84c-.128.256-.285.48-.472.672a1.911 1.911 0 01-.672.44c-.267.107-.56.16-.88.16zm1.216-3.056c0-.57-.102-1.037-.304-1.4-.203-.363-.507-.544-.912-.544-.4 0-.701.181-.904.544-.203.363-.304.83-.304 1.4 0 .592.101 1.064.304 1.416.208.352.51.528.904.528.395 0 .696-.176.904-.528.208-.352.312-.824.312-1.416z"
          fill={props.active !== 2 ? '#fff' : '#B92325'}
        />
      )}
      {props.speed === 1.5 && (
        <Path
          d="M6 7.544l1.832-1.456h.88V12h-1.16V7.656l-.944.728L6 7.544zm4.328 4.584a.642.642 0 01-.664-.656c0-.181.064-.333.192-.456a.656.656 0 01.472-.184.61.61 0 01.448.184.606.606 0 01.192.456.642.642 0 01-.192.472.61.61 0 01-.448.184zm3.369-3.936c.56 0 1.032.176 1.416.528.383.352.575.81.575 1.376 0 .581-.202 1.059-.607 1.432-.411.379-.944.568-1.6.568-.72 0-1.382-.219-1.985-.656l.473-.944c.5.341.986.512 1.456.512.325 0 .583-.085.775-.256a.844.844 0 00.296-.656.797.797 0 00-.287-.632 1.014 1.014 0 00-.713-.256c-.373 0-.698.13-.976.392l-.688-.552.32-2.96h3.129v1.088h-2.248l-.128 1.16c.245-.096.509-.144.792-.144z"
          fill={props.active !== 1.5 ? '#fff' : '#B92325'}
        />
      )}
      {props.speed === 1 && (
        <Path
          d="M6.129 7.544L7.96 6.088h.88V12H7.68V7.656l-.944.728-.608-.84zm4.368 4.584a.641.641 0 01-.664-.656c0-.181.064-.333.192-.456a.656.656 0 01.472-.184.61.61 0 01.448.184.606.606 0 01.192.456.642.642 0 01-.192.472.61.61 0 01-.448.184zm3.594-.032c-.528 0-.976-.144-1.344-.432-.698-.55-1.048-1.424-1.048-2.624 0-.57.083-1.077.248-1.52.171-.464.443-.835.816-1.112.374-.283.816-.424 1.328-.424.32 0 .614.053.88.16.267.107.491.256.672.448.187.187.344.41.472.672.128.256.222.533.28.832.059.299.088.613.088.944 0 .33-.029.645-.088.944a3.383 3.383 0 01-.28.84c-.128.256-.285.48-.472.672a1.913 1.913 0 01-.672.44c-.266.107-.56.16-.88.16zm1.216-3.056c0-.57-.101-1.037-.304-1.4-.202-.363-.506-.544-.912-.544-.4 0-.701.181-.904.544-.202.363-.304.83-.304 1.4 0 .592.102 1.064.304 1.416.208.352.51.528.904.528.395 0 .696-.176.904-.528.208-.352.312-.824.312-1.416z"
          fill={props.active !== 1 ? '#fff' : '#B92325'}
        />
      )}
      {props.speed === 0.5 && (
        <Path
          d="M8.205 12.096c-.528 0-.976-.144-1.344-.432-.699-.55-1.048-1.424-1.048-2.624 0-.57.083-1.077.248-1.52.17-.464.443-.835.816-1.112.373-.283.816-.424 1.328-.424.32 0 .613.053.88.16.267.107.49.256.672.448.187.187.344.41.472.672.128.256.222.533.28.832.059.299.088.613.088.944 0 .33-.03.645-.088.944a3.379 3.379 0 01-.28.84c-.128.256-.285.48-.472.672a1.912 1.912 0 01-.672.44c-.267.107-.56.16-.88.16zM9.421 9.04c0-.57-.101-1.037-.304-1.4-.203-.363-.507-.544-.912-.544-.4 0-.701.181-.904.544-.203.363-.304.83-.304 1.4 0 .592.101 1.064.304 1.416.208.352.51.528.904.528.395 0 .696-.176.904-.528.208-.352.312-.824.312-1.416zm2.438 3.088a.642.642 0 01-.664-.656c0-.181.064-.333.192-.456a.656.656 0 01.472-.184.61.61 0 01.448.184.606.606 0 01.192.456.642.642 0 01-.192.472.61.61 0 01-.448.184zm3.409-3.936c.56 0 1.032.176 1.416.528.384.352.576.81.576 1.376 0 .581-.203 1.059-.608 1.432-.41.379-.944.568-1.6.568-.72 0-1.382-.219-1.984-.656l.472-.944c.501.341.986.512 1.456.512.325 0 .584-.085.776-.256a.844.844 0 00.296-.656.797.797 0 00-.288-.632 1.014 1.014 0 00-.712-.256c-.374 0-.699.13-.976.392l-.688-.552.32-2.96h3.128v1.088h-2.248l-.128 1.16c.245-.096.51-.144.792-.144z"
          fill={props.active !== 0.5 ? '#fff' : '#B92325'}
        />
      )}
      <Rect
        x={0.75}
        y={0.75}
        width={20.5}
        height={16.5}
        rx={2.25}
        stroke={props.active === props.speed ? '#B92325' : '#fff'}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
SvgComponent.defaultProps = {
  color: '#fff',
  speed: 1,
  active: 1,
};

export default SvgComponent;
