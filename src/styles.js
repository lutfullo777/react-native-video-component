import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animatedView: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -2,
    backgroundColor: '#000',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footericons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  end: {
    alignSelf: 'flex-end',
  },
  next: {
    marginHorizontal: '6%',
  },
  icon: {
    height: 35,
    minWidth: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  desc: {
    color: '#fff',
    opacity: 0.6,
    fontSize: 12,
    fontWeight: '500',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    marginRight: 20,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  centerIcon: {
    padding: 40,
  },
  seekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: '4%',
  },
  timerText: {
    color: '#fff',
    fontSize: 12,
  },
  seeker: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  buffer: width => ({
    position: 'absolute',
    width: `${width}%`,
    height: 4,
    left: 0,
    zIndex: -1,
    borderRadius: 2,
  }),
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: -1,
  },
  loaderImg: {
    width: 80,
    height: 80,
  },
  indicatorCon: isRight => ({
    position: 'absolute',
    left: isRight ? 30 : 'auto',
    right: !isRight ? 30 : 'auto',
    alignItems: 'center',
  }),
  full: (height, color) => ({
    height: `${height}%`,
    backgroundColor: color,
  }),
  indicator: {
    width: 5,
    height: 180,
    backgroundColor: 'rgba(255,255,225,0.4)',
    borderRadius: 5,
    marginTop: 5,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  speedContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    alignItems: 'center',
  },
  speedView: {
    backgroundColor: 'rgba(3, 3, 27, 0.9)',
    borderRadius: 10,
    padding: 15,
    minWidth: 200,
    bottom: 5,
  },
  square: {
    width: 22,
    height: 22,
    backgroundColor: 'rgba(3, 3, 27, 0.9)',
    transform: [{rotate: '45deg'}],
    position: 'absolute',
    alignSelf: 'center',
    bottom: -10,
    zIndex: 1,
  },
  speedItem: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  speedTitle: active => ({
    fontSize: 12,
    color: active ? '#B92325' : '#fff',
    marginLeft: 10,
    fontWeight: '600',
  }),
});
