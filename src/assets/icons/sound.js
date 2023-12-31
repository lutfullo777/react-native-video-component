import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({size, mute, ...props}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {mute ? (
        <>
          <Path
            d="M7.533 7.602l.45.6-.45-.6zM11.8 4.403l-.45-.6.45.6zm0 15.194l.45-.6-.45.6zm-4.267-3.2l.45-.6-.45.6zm.45-8.195l4.267-3.198-.9-1.2-4.267 3.198.9 1.2zm6.267-2.2v11.995h1.5V6.003h-1.5zm-2 12.995l-4.267-3.2-.9 1.201 4.267 3.199.9-1.2zm2-1c0 1.029-1.176 1.618-2 1l-.9 1.2c1.813 1.358 4.4.066 4.4-2.2h-1.5zm-2-12.993c.824-.619 2-.03 2 .999h1.5c0-2.266-2.588-3.558-4.4-2.2l.9 1.2zM6.334 7.252H4v1.5h2.334v-1.5zM1.25 10v3.998h1.5v-3.998h-1.5zM4 16.748h2.334v-1.5H4v1.5zM1.25 14A2.75 2.75 0 004 16.75v-1.5c-.69 0-1.25-.56-1.25-1.25h-1.5zM4 7.252A2.75 2.75 0 001.25 10h1.5c0-.69.56-1.25 1.25-1.25v-1.5zm3.983 8.546a2.75 2.75 0 00-1.65-.55v1.5c.271 0 .534.088.75.25l.9-1.2zm-.9-8.796a1.25 1.25 0 01-.75.25v1.5a2.75 2.75 0 001.65-.55l-.9-1.2z"
            fill={props.color}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.2 10.2a.682.682 0 01.964 0l1.336 1.336 1.336-1.336a.682.682 0 11.964.964L20.464 12.5l1.336 1.336a.682.682 0 11-.964.964L19.5 13.464 18.164 14.8a.682.682 0 11-.964-.964l1.336-1.336-1.336-1.336a.682.682 0 010-.964z"
            fill={props.color}
          />
        </>
      ) : (
        <Path
          d="M18.375 9.618a.75.75 0 10-.75 1.299l.75-1.299zm-.75 3.465a.75.75 0 00.75 1.299l-.75-1.299zm.524-6.718a.75.75 0 00-.298 1.47l.298-1.47zm-.298 9.8a.75.75 0 10.298 1.47l-.298-1.47zM7.533 7.602l.45.6-.45-.6zM11.8 4.403l-.45-.6.45.6zm0 15.194l.45-.6-.45.6zm-4.267-3.2l.45-.6-.45.6zm10.091-5.48c.376.217.626.621.626 1.083h1.5a2.75 2.75 0 00-1.375-2.382l-.75 1.299zM18.25 12c0 .462-.25.866-.625 1.083l.75 1.299A2.75 2.75 0 0019.75 12h-1.5zm-.4-4.165c1.94.394 3.4 2.11 3.4 4.165h1.5a5.752 5.752 0 00-4.6-5.635l-.3 1.47zM21.25 12a4.252 4.252 0 01-3.4 4.165l.3 1.47A5.752 5.752 0 0022.75 12h-1.5zM7.983 8.202l4.267-3.198-.9-1.2-4.267 3.198.9 1.2zm6.267-2.2v11.995h1.5V6.003h-1.5zm-2 12.995l-4.267-3.2-.9 1.201 4.267 3.199.9-1.2zm2-1c0 1.029-1.176 1.618-2 1l-.9 1.2c1.813 1.358 4.4.066 4.4-2.2h-1.5zm-2-12.993c.824-.619 2-.03 2 .999h1.5c0-2.266-2.588-3.558-4.4-2.2l.9 1.2zM6.334 7.252H4v1.5h2.334v-1.5zM1.25 10v3.998h1.5v-3.998h-1.5zM4 16.748h2.334v-1.5H4v1.5zM1.25 14A2.75 2.75 0 004 16.75v-1.5c-.69 0-1.25-.56-1.25-1.25h-1.5zM4 7.252A2.75 2.75 0 001.25 10h1.5c0-.69.56-1.25 1.25-1.25v-1.5zm3.983 8.546a2.75 2.75 0 00-1.65-.55v1.5c.271 0 .534.088.75.25l.9-1.2zm-.9-8.796a1.25 1.25 0 01-.75.25v1.5a2.75 2.75 0 001.65-.55l-.9-1.2z"
          fill={props.color}
        />
      )}
    </Svg>
  );
}

SvgComponent.defaultProps = {
  size: 24,
  color: '#fff',
};

export default SvgComponent;
