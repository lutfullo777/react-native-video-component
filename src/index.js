import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Animated,
  TouchableOpacity,
  Text,
  Image,
  Easing,
  PanResponder,
} from 'react-native';
import styles from './styles';
import Icons from './assets/icons';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import { Slider } from '@miblanchard/react-native-slider';
import SystemSetting from 'react-native-system-setting';
import Speed from './speed';
import Quality from './quality';
import PropTypes from 'prop-types';

const calculateTime = (secs) => {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};

const RNVideo = (props) => {
  const [showButtons, setShowButtons] = useState(false);
  const [volume, setVolume] = useState(0);
  const [bright, setBright] = useState(0);
  const [resized, setResized] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isLock, setIsLock] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showBright, setShowBright] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playablekDuration, setPlayableDuration] = useState(0);
  const [speed, setSpeed] = useState({ value: 1 });
  const [url, setUrl] = useState(props.urls[0] ?? { url: '' });

  const animationOpacity = useRef(new Animated.Value(0)).current;
  const loaderAnimation = useRef(new Animated.Value(0)).current;
  const videoRef = useRef(null);
  const seek = useRef(false);
  const currentTimeRef = useRef(0);
  const isFullRef = useRef(false);
  const volumeRef = useRef(0);
  const brightRef = useRef(0);
  const speedRef = useRef(null);
  const qualityRef = useRef(null);
  const toggleTimer = useRef(null);
  const dimension = useRef({ width: 0, height: 0 });

  const getSpeedRef = useCallback((ref) => (speedRef.current = ref));
  const getQualityRef = useCallback((ref) => (qualityRef.current = ref));

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const dy = gestureState.dy / 5;

        if (dy > 2 || dy < -2) {
          if (e.nativeEvent.pageY + 100 < dimension.current.height) {
            if (e.nativeEvent.pageX < dimension.current.width / 2) {
              const val = brightRef.current - dy;
              setShowBright(true);
              setShowVolume(false);
              val <= 0
                ? (setBright(0), SystemSetting.setAppBrightness(0))
                : val >= 100
                ? (setBright(100), SystemSetting.setAppBrightness(1))
                : (setBright(val), SystemSetting.setAppBrightness(val / 100));
            } else {
              const val = volumeRef.current - dy;
              setShowVolume(true);
              setShowBright(false);
              val <= 0
                ? (setVolume(0), SystemSetting.setVolume(0))
                : val >= 100
                ? (setVolume(100), SystemSetting.setVolume(1))
                : (setVolume(val), SystemSetting.setVolume(val / 100));
            }
          }
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const dy = gestureState.dy / 5;

        if (dy <= 2 || dy >= -2) {
          toggleShowButtons();
        }
        setShowVolume(false);
        setShowBright(false);

        if (e.nativeEvent.locationX < dimension.current.width / 2) {
          const val = brightRef.current - dy;
          val <= 0
            ? (brightRef.current = 0)
            : val >= 100
            ? (brightRef.current = 100)
            : (brightRef.current = val);
        } else {
          const val = volumeRef.current - dy;
          val <= 0
            ? (volumeRef.current = 0)
            : val >= 100
            ? (volumeRef.current = 100)
            : (volumeRef.current = val);
        }
      },
    })
  ).current;

  const onOrientationDidChange = useCallback((orientation) => {
    if (orientation == 'LANDSCAPE-LEFT' || orientation == 'LANDSCAPE-RIGHT') {
      setIsFull(true);
      isFullRef.current = true;
    } else {
      isFullRef.current = false;
      setIsFull(false);
    }
  }, []);

  useEffect(() => {
    SystemSetting.getVolume().then((volume) => {
      setVolume(volume * 100);
      volumeRef.current = volume * 100;
    });

    SystemSetting.getAppBrightness().then((brightness) => {
      setBright(brightness * 100);
      brightRef.current = brightness * 100;
    });
    Orientation.addOrientationListener(onOrientationDidChange);
    return () => {
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  }, []);

  const clearShowBtn = useCallback(() => {
    clearTimeout(toggleTimer.current);

    toggleTimer.current = setTimeout(() => {
      setShowButtons(false);
      speedRef.current?.close();
      qualityRef.current?.close();
      animationOpacity.setValue(0);
    }, props.controlsTimeout);
  }, []);

  const toggleShowButtons = useCallback(() => {
    if (animationOpacity._value <= 0) {
      setShowButtons(true);
    }
    Animated.timing(animationOpacity, {
      duration: 500,
      toValue: animationOpacity._value <= 0 ? 1 : 0,
      useNativeDriver: false,
    }).start(() => {
      if (animationOpacity._value <= 0) {
        setShowButtons(false);
      }
    });
    clearShowBtn();
  }, []);

  const changePosition = () => {
    isFull ? Orientation.lockToPortrait() : Orientation.lockToLandscapeLeft();

    setIsFull((pr) => !pr);
    isFullRef.current = !isFullRef.current;
  };

  const onValueChange = useCallback((val) => {
    seek.current = true;
    videoRef.current?.seek(...val);
  }, []);

  const onLoadVideo = useCallback((data) => {
    if (props.onLoad) {
      props.onLoad(data);
    }
    setDuration(data.duration);
    if (currentTimeRef.current > 0) {
      videoRef.current.seek(currentTimeRef.current);
    }
  }, []);

  const onProgressVideo = useCallback((data) => {
    if (props.onProgress) {
      props.onProgress(data);
    }
    if (!seek.current) {
      setCurrentTime(data.currentTime);
      currentTimeRef.current = data.currentTime;
      setPlayableDuration(data.playableDuration);
    }
  }, []);

  const onBufferVideo = useCallback((data) => {
    if (props.onBuffer) {
      props.onBuffer(data);
    }
    setLoading(data.isBuffering);
    if (data.isBuffering) {
      Animated.loop(
        Animated.timing(loaderAnimation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      loaderAnimation.resetAnimation();
    }
  }, []);

  const seekHandler = useCallback((time) => {
    seek.current = true;
    videoRef.current?.seek(currentTimeRef.current + time);
    clearShowBtn();
    setCurrentTime(currentTimeRef.current + time);
    currentTimeRef.current = currentTimeRef.current + time;
  }, []);

  const onSeek = useCallback((data) => {
    if (props.onSeek) {
      props.onSeek(data);
    }
    seek.current = false;
  }, []);

  const renderTopControls = useMemo(
    () => (
      <View style={styles.top}>
        {!isLock && (
          <>
            <View style={styles.row}>
              {props.showBack && (
                <TouchableOpacity onPress={props.onBack} style={styles.icon}>
                  <Icons.ArrowLeft />
                </TouchableOpacity>
              )}
              <View style={styles.container}>
                {!!props.title && (
                  <Text
                    numberOfLines={1}
                    style={[styles.title, props.titleStyle]}
                  >
                    {props.title}
                  </Text>
                )}
                {!!props.desc && (
                  <Text
                    numberOfLines={1}
                    style={[styles.desc, props.descStyle]}
                  >
                    {props.desc}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.icons}>
              {props.showResize && (
                <TouchableOpacity
                  onPress={() => setResized((pr) => !pr)}
                  style={styles.icon}
                >
                  <Icons.Resize isFull={resized} />
                </TouchableOpacity>
              )}
              {props.showFull && (
                <TouchableOpacity onPress={changePosition} style={styles.icon}>
                  <Icons.Full isFull={isFull} />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    ),
    [resized, isFull, isLock]
  );

  const renderCenterControls = useMemo(
    () => (
      <View style={styles.center}>
        {!isLock && (
          <>
            {props.showPrevNext && (
              <TouchableOpacity
                onPress={() => seekHandler(-15)}
                style={styles.centerIcon}
              >
                <Icons.Backward15 />
              </TouchableOpacity>
            )}
            {props.showPlayPause && (
              <TouchableOpacity
                style={styles.centerIcon}
                onPress={() => setIsPlaying((pr) => !pr)}
              >
                <Icons.Play isPlaying={isPlaying} />
              </TouchableOpacity>
            )}
            {props.showPrevNext && (
              <TouchableOpacity
                onPress={() => seekHandler(15)}
                style={styles.centerIcon}
              >
                <Icons.Forward15 />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    ),
    [isPlaying, isLock]
  );

  const renderBottomControls = useMemo(() => {
    return !isLock ? (
      <View style={styles.footericons}>
        <View style={styles.icons}>
          {props.showLock && (
            <TouchableOpacity
              onPress={() => setIsLock((pr) => !pr)}
              style={styles.icon}
            >
              <Icons.Lock />
            </TouchableOpacity>
          )}
          {props.showSpeed && (
            <TouchableOpacity
              onPress={() => {
                speedRef.current.open();
              }}
              style={styles.icon}
            >
              <Icons.Speed />
            </TouchableOpacity>
          )}
          {props.showQuality && (
            <TouchableOpacity
              onPress={() => {
                qualityRef.current.open();
              }}
              style={styles.icon}
            >
              <Icons.Quality quality={url.quality} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => setIsLock(false)}
        style={[styles.icon, styles.end]}
      >
        <Icons.Lock />
      </TouchableOpacity>
    );
  }, [isLock, url]);

  const renderSlider = useMemo(() => {
    return (
      <View style={styles.seekContainer}>
        {!isLock && (
          <>
            <Text style={[styles.timerText, props.timerStyle]}>
              {calculateTime(currentTime)}
            </Text>
            <View style={styles.seeker}>
              <Slider
                minimumValue={0}
                value={currentTime}
                maximumValue={duration}
                minimumTrackTintColor={props.activeSeekColor}
                maximumTrackTintColor={props.inactiveSeekColor}
                thumbTintColor={props.activeSeekColor}
                tapToSeek={true}
                onValueChange={onValueChange}
                containerStyle={{ height: 20 }}
                thumbStyle={{ width: 14, height: 14 }}
                trackStyle={{ height: 4 }}
              />
              <View
                style={[
                  styles.buffer((playablekDuration * 100) / duration),
                  { backgroundColor: props.bufferColor },
                ]}
              />
            </View>
            <Text style={[styles.timerText, props.timerStyle]}>
              {calculateTime(duration)}
            </Text>
          </>
        )}
      </View>
    );
  }, [currentTime, duration, playablekDuration, isLock]);

  return (
    <TouchableWithoutFeedback>
      <View
        onLayout={(e) => {
          dimension.current = e.nativeEvent.layout;
        }}
        style={styles.container}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.animatedView,
            {
              backgroundColor: animationOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'],
              }),
              opacity: animationOpacity,
            },
          ]}
        >
          {showButtons && (
            <>
              {renderTopControls}
              {renderCenterControls}
              {
                <View>
                  {props.showIndicator && renderSlider}
                  {renderBottomControls}
                </View>
              }
            </>
          )}
        </Animated.View>
        <Video
          {...props}
          ref={videoRef}
          rate={Number(speed.value)}
          onLoad={onLoadVideo}
          onProgress={onProgressVideo}
          onBuffer={onBufferVideo}
          onSeek={onSeek}
          paused={!isPlaying}
          resizeMode={resized ? 'cover' : 'contain'}
          style={styles.video}
          source={
            typeof url.url === 'string'
              ? {
                  uri: url.url,
                }
              : url.url
          }
        />
        {loading && (
          <Animated.View
            style={[
              styles.loader,
              {
                transform: [
                  {
                    rotate: loaderAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              style={styles.loaderImg}
              source={require('images/loader.png')}
            />
          </Animated.View>
        )}
        {showVolume && (
          <View style={styles.indicatorCon(true)}>
            <Icons.Sound color="rgba(255,255,255,0.7)" />
            <View style={styles.indicator}>
              <View style={styles.full(volume, props.activeSeekColor)} />
            </View>
          </View>
        )}
        {showBright && (
          <View style={styles.indicatorCon(false)}>
            <Icons.Bright color="rgba(255,255,255,0.7)" />
            <View style={styles.indicator}>
              <View style={styles.full(bright, props.activeSeekColor)} />
            </View>
          </View>
        )}
        <Speed
          setSpeed={setSpeed}
          speed={speed}
          speeds={props.speeds}
          getRef={getSpeedRef}
        />
        <Quality
          setUrl={setUrl}
          urls={props.urls ?? []}
          url={url}
          getRef={getQualityRef}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

RNVideo.defaultProps = {
  title: 'React Native Video',
  desc: 'React Native Video Component 0.0.1',
  speeds: [
    {
      value: 2,
      title: 'Fast Speed',
    },
    {
      value: 1.5,
      title: 'Faster',
    },
    {
      value: 1,
      title: 'Normal',
    },
    {
      value: 0.5,
      title: 'Slow',
    },
  ],
  urls: [],
  showResize: true,
  showFull: true,
  showLock: true,
  showSpeed: true,
  showQuality: true,
  showBack: true,
  showIndicator: true,
  showPlayPause: true,
  showPrevNext: true,

  //styles
  titleStyle: {},
  descStyle: {},
  timerStyle: {},

  onBack: () => {},

  //color
  activeSeekColor: '#B92325',
  inactiveSeekColor: 'rgba(255, 255, 255, 0.4)',
  bufferColor: 'rgba(255, 255, 255, 0.5)',
  controlsTimeout: 5000,
};

Video.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  speeds: PropTypes.shape([
    {
      value: PropTypes.number,
      title: PropTypes.string,
    },
  ]),
  urls: PropTypes.shape([
    {
      quality: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      url: PropTypes.string,
    },
  ]),
  showResize: PropTypes.bool,
  showFull: PropTypes.bool,
  showLock: PropTypes.bool,
  showSpeed: PropTypes.bool,
  showQuality: PropTypes.bool,
  showBack: PropTypes.bool,
  showIndicator: PropTypes.bool,
  showPlayPause: PropTypes.bool,
  showPrevNext: PropTypes.bool,
  titleStyle: PropTypes.object,
  descStyle: PropTypes.object,
  timerStyle: PropTypes.object,
  onBack: PropTypes.func,

  //color
  activeSeekColor: PropTypes.string,
  inactiveSeekColor: PropTypes.string,
  bufferColor: PropTypes.string,
  controlsTimeout: PropTypes.number,

  filter: PropTypes.oneOf([
    FilterType.NONE,
    FilterType.INVERT,
    FilterType.MONOCHROME,
    FilterType.POSTERIZE,
    FilterType.FALSE,
    FilterType.MAXIMUMCOMPONENT,
    FilterType.MINIMUMCOMPONENT,
    FilterType.CHROME,
    FilterType.FADE,
    FilterType.INSTANT,
    FilterType.MONO,
    FilterType.NOIR,
    FilterType.PROCESS,
    FilterType.TONAL,
    FilterType.TRANSFER,
    FilterType.SEPIA,
  ]),
  filterEnabled: PropTypes.bool,
  /* Native only */
  src: PropTypes.object,
  seek: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  fullscreen: PropTypes.bool,
  onVideoLoadStart: PropTypes.func,
  onVideoLoad: PropTypes.func,
  onVideoBuffer: PropTypes.func,
  onVideoError: PropTypes.func,
  onVideoProgress: PropTypes.func,
  onVideoBandwidthUpdate: PropTypes.func,
  onVideoSeek: PropTypes.func,
  onVideoEnd: PropTypes.func,
  onTimedMetadata: PropTypes.func,
  onVideoAudioBecomingNoisy: PropTypes.func,
  onVideoExternalPlaybackChange: PropTypes.func,
  onVideoFullscreenPlayerWillPresent: PropTypes.func,
  onVideoFullscreenPlayerDidPresent: PropTypes.func,
  onVideoFullscreenPlayerWillDismiss: PropTypes.func,
  onVideoFullscreenPlayerDidDismiss: PropTypes.func,

  /* Wrapper component */
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    // Opaque type returned by require('./video.mp4')
    PropTypes.number,
  ]),
  drm: PropTypes.shape({
    type: PropTypes.oneOf([
      DRMType.CLEARKEY,
      DRMType.FAIRPLAY,
      DRMType.WIDEVINE,
      DRMType.PLAYREADY,
    ]),
    licenseServer: PropTypes.string,
    headers: PropTypes.shape({}),
    base64Certificate: PropTypes.bool,
    certificateUrl: PropTypes.string,
    getLicense: PropTypes.func,
  }),
  minLoadRetryCount: PropTypes.number,
  maxBitRate: PropTypes.number,
  resizeMode: PropTypes.string,
  poster: PropTypes.string,
  posterResizeMode: ImagePropTypes.resizeMode,
  repeat: PropTypes.bool,
  automaticallyWaitsToMinimizeStalling: PropTypes.bool,
  allowsExternalPlayback: PropTypes.bool,
  selectedAudioTrack: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  selectedVideoTrack: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  selectedTextTrack: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  textTracks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uri: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        TextTrackType.SRT,
        TextTrackType.TTML,
        TextTrackType.VTT,
      ]),
      language: PropTypes.string.isRequired,
    })
  ),
  paused: PropTypes.bool,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  bufferConfig: PropTypes.shape({
    minBufferMs: PropTypes.number,
    maxBufferMs: PropTypes.number,
    bufferForPlaybackMs: PropTypes.number,
    bufferForPlaybackAfterRebufferMs: PropTypes.number,
  }),
  stereoPan: PropTypes.number,
  rate: PropTypes.number,
  pictureInPicture: PropTypes.bool,
  playInBackground: PropTypes.bool,
  preferredForwardBufferDuration: PropTypes.number,
  playWhenInactive: PropTypes.bool,
  ignoreSilentSwitch: PropTypes.oneOf(['ignore', 'obey']),
  reportBandwidth: PropTypes.bool,
  disableFocus: PropTypes.bool,
  controls: PropTypes.bool,
  audioOnly: PropTypes.bool,
  currentTime: PropTypes.number,
  fullscreenAutorotate: PropTypes.bool,
  fullscreenOrientation: PropTypes.oneOf(['all', 'landscape', 'portrait']),
  progressUpdateInterval: PropTypes.number,
  useTextureView: PropTypes.bool,
  hideShutterView: PropTypes.bool,
  onLoadStart: PropTypes.func,
  onLoad: PropTypes.func,
  onBuffer: PropTypes.func,
  onError: PropTypes.func,
  onProgress: PropTypes.func,
  onBandwidthUpdate: PropTypes.func,
  onSeek: PropTypes.func,
  onEnd: PropTypes.func,
  onFullscreenPlayerWillPresent: PropTypes.func,
  onFullscreenPlayerDidPresent: PropTypes.func,
  onFullscreenPlayerWillDismiss: PropTypes.func,
  onFullscreenPlayerDidDismiss: PropTypes.func,
  onReadyForDisplay: PropTypes.func,
  onPlaybackStalled: PropTypes.func,
  onPlaybackResume: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onAudioFocusChanged: PropTypes.func,
  onAudioBecomingNoisy: PropTypes.func,
  onPictureInPictureStatusChanged: PropTypes.func,
  needsToRestoreUserInterfaceForPictureInPictureStop: PropTypes.func,
  onExternalPlaybackChange: PropTypes.func,

  /* Required by react-native */
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  rotation: PropTypes.number,
  ...ViewPropTypes,
};

export default RNVideo;
