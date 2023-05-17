import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {width} from '@Theme/Layout';
import useTheme from '@Hooks/useTheme';

export default function CarouselItem(props: any) {
  const {imgUrl, index, onPress} = props;
  const {MetricsSizes} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemCarouselBody, {marginRight: MetricsSizes.small}]}
      key={index}>
      <Image
        resizeMode="cover"
        source={{uri: imgUrl}}
        style={[styles.itemCarouselImage, {borderRadius: MetricsSizes.large}]}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemCarouselBody: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    maxHeight: width * 0.4,
    width: width * 0.9,
    flexGrow: 2,
  },
  itemCarouselImage: {
    paddingTop: 0,
    height: width * 0.4,
    width: '100%',
  },
});
