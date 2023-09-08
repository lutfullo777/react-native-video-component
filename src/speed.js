import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import Icons from './assets/icons';
import styles from './styles';

const Speed = ({getRef, setSpeed, speed, speeds}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ref = {
      open: () => setVisible(true),
    };
    getRef(ref);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => setVisible(false)}
      activeOpacity={1}
      style={styles.speedContainer}>
      <View style={[styles.speedView]}>
        {speeds.map((item, index) => (
          <TouchableOpacity
            style={styles.speedItem}
            onPress={() => {
              setSpeed(item);
              setVisible(false);
            }}
            key={index}>
            <Icons.Quality
              quality={item.value.toFixed(1)}
              active={speed.value.toFixed(1)}
            />
            <Text style={styles.speedTitle(speed.value === item.value)}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={styles.square} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(Speed);
