import * as React from 'react';
import Video from '@video/react-native-video';

export default function App() {
  return (
    <Video
      urls={[
        {
          quality: 720,
          url: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
        },
      ]}
    />
  );
}
