import {
  View,
  TouchableOpacityProps,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import React from 'react';
import Text from '@Atom/Text';
import FastImage from 'react-native-fast-image';
import useTheme from '@Hooks/useTheme';
import Icon from '@Atom/Icon';

interface ICircleCard extends TouchableOpacityProps {
  width: number;
  height: number;
  backgroundImageUrl?: string;
  iconImageUrl?: string;
  isPremium?: boolean;
  item?: any;
}

const CircleCard = ({
  width,
  height,
  backgroundImageUrl,
  iconImageUrl,
  isPremium,
  item,
  style,
  ...props
}: ICircleCard) => {
  const { Layout, Common, Colors, Gutters, Images } = useTheme();
  return (
    // TODO: integrate data with api
    <TouchableOpacity style={[{ width, height }, style]} {...props}>
      <FastImage
        source={{ uri: item?.banner }}
        style={[Layout.center, { width, height, borderRadius: 24 }]}
      // resizeMode={FastImage.resizeMode.contain}
      >
        <View style={[styles.overlay, { width: width, height: height }]} />
        {item?.isPremium ? (
          <View
            style={[
              Common.backgroundLayout,
              Layout.round,
              Layout.rowCenter,
              Gutters.tinyPadding,
              { position: 'absolute', right: '5%', top: '13%' },
            ]}>
            <Icon name="crown" color={Colors.warning[500]} size="sm" />
            <Text
              size="xs"
              color={Colors.primary[600]}
              style={[Gutters.tinyLMargin]}>
              Premium
            </Text>
          </View>
        ) : null}
        <FastImage
          source={{ uri: item?.image }}
          style={[Layout.round, { width: width / 4, height: width / 4 }]}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          color={Colors.neutral[100]}
          variant="semibold"
          style={[Gutters.tinyVMargin]}>
          {item?.name}
        </Text>
        <View style={[Layout.rowHCenter]}>
          <View style={[Layout.rowHCenter]}>
            <Icon
              name="arrow-up-outline"
              color={Colors.primary[600]}
              size={width / 16}
            />
            <Text
              color={Colors.white}
              size={width / 23}
              style={[{ marginLeft: 2 }]}>
              {`+${item?.totalRating}`}
            </Text>
          </View>
          <View style={[Layout.rowHCenter, Gutters.smallHMargin]}>
            <Icon name="users" color={Colors.primary[600]} size={width / 16} />
            <Text
              color={Colors.white}
              size={width / 23}
              style={[{ marginLeft: 2 }]}>
              {item?.totalMember}
            </Text>
          </View>
          <View style={[Layout.rowHCenter]}>
            <Icon
              name="file-text"
              color={Colors.primary[600]}
              size={width / 16}
            />
            <Text
              color={Colors.white}
              size={width / 23}
              style={[{ marginLeft: 1 }]}>
              324
            </Text>
          </View>
        </View>
      </FastImage>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
  }
});

export default CircleCard;
