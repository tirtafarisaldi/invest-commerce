import React, {memo} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ViewStyle,
} from 'react-native';
import ImageBackground from 'react-native-fast-image';
import {width} from '@Theme/Layout';
import useTheme from '@Hooks/useTheme';
import {Icon, Text} from '@Atom/index';
import IconLabel from './IconLabel';

type Props = {
  circleName: string;
  imageUri: string;
  trending: string;
  members: number;
  posts: number;
  isPremium?: boolean;
  variant?: 'halfSize' | 'fullSize';
  style?: ViewStyle;
  onPress?: () => void;
};
const CircleCard = ({
  circleName,
  imageUri,
  trending,
  members,
  posts,
  isPremium,
  variant,
  style,
  onPress,
}: Props) => {
  const {Colors, MetricsSizes} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.itemCarouselBody,
        {marginRight: MetricsSizes.small},
        style,
      ]}
      onPress={onPress}>
      <ImageBackground
        resizeMode="cover"
        source={{uri: imageUri}}
        style={[styles.itemCarouselImage, {borderRadius: MetricsSizes.large}]}>
        <View style={styles.itemContent}>
          {isPremium && (
            <View style={styles.premiumWrapper}>
              <Icon
                name={'check-circle-filled'}
                size={'xs'}
                color={Colors.primary[600]}
              />
              <Text
                color={Colors.primary[500]}
                size="xs2"
                style={styles.infoText}>
                Premium
              </Text>
            </View>
          )}
          <View style={styles.roundBorder}>
            <Image
              resizeMode="cover"
              source={{uri: imageUri}}
              style={styles.avatarCircle}
            />
          </View>
          <Text color={Colors.white} size="base" variant="semibold">
            {circleName}
          </Text>
          <View style={styles.circleInfoBox}>
            <IconLabel
              icon={{
                name: 'arrow-up-outline',
                size: variant === 'halfSize' ? 'sm' : 'lg',
              }}
              text={{
                text: trending.toString(),
                size: variant === 'halfSize' ? 'xs' : 'sm',
              }}
            />
            <IconLabel
              icon={{name: 'users', size: variant === 'halfSize' ? 'sm' : 'lg'}}
              text={{
                text: members.toString(),
                size: variant === 'halfSize' ? 'xs' : 'sm',
              }}
            />
            <IconLabel
              icon={{
                name: 'file-text',
                size: variant === 'halfSize' ? 'sm' : 'lg',
              }}
              text={{
                text: posts.toString(),
                size: variant === 'halfSize' ? 'xs' : 'sm',
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo<Props>(CircleCard);

const styles = StyleSheet.create({
  itemCarouselBody: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexGrow: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  premiumWrapper: {
    position: 'absolute',
    zIndex: 22,
    top: 10,
    right: 10,
    flexDirection: 'row',
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 4,
    borderRadius: 10,
  },
  itemContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12, 12, 12, 0.75)',
  },
  itemCarouselImage: {
    paddingTop: 0,
    height: width * 0.45,
    width: '100%',
  },
  roundBorder: {
    backgroundColor: '#fff',
    height: 78,
    width: 78,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 39,
    marginBottom: 8,
  },
  avatarCircle: {
    flexDirection: 'row',
    maxHeight: 72,
    width: 72,
    flexGrow: 2,
    borderRadius: 36,
  },
  circleInfoBox: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    paddingLeft: 2,
  },
});
