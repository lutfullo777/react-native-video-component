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
      <Path
        d="M18.54.266a.868.868 0 00-1.25 0 .927.927 0 000 1.286l1.83 1.88c.152.156.197.391.115.595a.53.53 0 01-.49.337H16.5C10.208 4.364 5 9.716 5 16.182 5 22.648 10.208 28 16.5 28S28 22.648 28 16.182a.897.897 0 00-.885-.91.897.897 0 00-.884.91c0 5.461-4.417 10-9.731 10-5.315 0-9.73-4.539-9.73-10 0-5.462 4.415-10 9.73-10h2.244a.53.53 0 01.49.337.557.557 0 01-.114.594l-1.83 1.88a.927.927 0 000 1.286.868.868 0 001.25 0l4.247-4.363a.927.927 0 000-1.286L18.541.266z"
        fill="#fff"
      />
      <Path
        d="M13.301 13.055l-1.828 1.714.874.935.357-.323c.118-.112.203-.228.256-.347l.027-.06h.187l-.012.652v3.079h-1.52v1.3h4.56v-1.3h-1.53v-5.65h-1.37zM17.522 13.055l-.277 3.573.819.308c.32-.153.641-.231.965-.231.35 0 .646.084.88.26.24.18.36.426.36.73 0 .302-.116.549-.348.729-.219.167-.47.25-.752.25-.509 0-.986-.198-1.428-.585l-.733 1.179c.623.57 1.39.857 2.311.857.758 0 1.368-.233 1.84-.692.473-.46.71-1.043.71-1.758 0-.656-.214-1.19-.64-1.61-.423-.422-1.025-.64-1.82-.64-.214 0-.374.023-.485.063l-.017.007h-.153l.056-.39.045-.75h2.474v-1.3h-3.807z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
