import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {height, width} from '@Theme/Layout';

interface Props {
  onEnd: () => void;
}

const SplashScreen = ({onEnd}: Props) => {
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPaused(false);
    }, 300);
  }, []);

  return (
    <View style={styles.backgroundContainer}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <Video
        source={require('../../Assets/Videos/splashport.mp4')}
        onEnd={onEnd}
        paused={paused}
        resizeMode="cover"
        muted={false}
        style={{
          width,
          height:
            Platform.OS === 'ios'
              ? height
              : ExtraDimensions.getRealWindowHeight(),
        }}
      />
      <Pressable style={styles.tapToSkip} onPress={onEnd} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'relative',
  },
  tapToSkip: {
    position: 'absolute',
    height:
      Platform.OS === 'ios' ? height : ExtraDimensions.getRealWindowHeight(),
    width,
    zIndex: 999,
  },
});
