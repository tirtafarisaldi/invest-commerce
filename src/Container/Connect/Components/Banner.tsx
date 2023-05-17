import {width} from '@Theme/Layout';
import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  imageUri?: string | ImageSourcePropType;
  style?: ViewStyle;
  onPress?: () => void;
};

const Banner = ({imageUri, style, onPress}: Props) => {
  const imageSource = React.useMemo(() => {
    if (typeof imageUri === 'string') {
      return {uri: imageUri};
    }
    return imageUri;
  }, [imageUri]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image
        resizeMode="cover"
        source={imageSource as string as ImageSourcePropType}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  image: {
    flex: 1,
    height: width * 0.27,
    width: '100%',
  },
});
export default Banner;
