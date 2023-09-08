import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import Icons from './assets/icons';
import styles from './styles';

const Quality = ({getRef, setUrl, urls, url}) => {
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
      <View style={[styles.speedView, {left: 42}]}>
        {urls.map((item, index) => (
          <TouchableOpacity
            style={styles.speedItem}
            onPress={() => {
              setUrl(item);
              setVisible(false);
            }}
            key={index}>
            <Icons.Quality quality={item.quality} active={url.quality} />
            <Text style={styles.speedTitle(url.quality === item.quality)}>
              {item.quality}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={styles.square} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(Quality);
