import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import useTheme from '@Hooks/useTheme';
import { width } from '@Theme/Layout';
import { Icon, Text } from '@Atom/index';

export default function CirclePortraitCard({ item, style }: any) {
  const { Layout, Colors, Gutters, Images } = useTheme();
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  const cardHeight = randomBool ? 150 : 280;

  return (
    <View key={item.id} style={[{ marginTop: 12, flex: 1 }, style]}>
      <FastImage
        source={{ uri: item?.banner }}
        style={{
          height: cardHeight,
          alignSelf: 'stretch',
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        resizeMode="cover">
        <View style={[styles.overlay, { width: width, height: cardHeight }]} />
        <FastImage
          source={{ uri: item?.image }}
          style={[Layout.round, { width: width / 6, height: width / 6 }]}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={[Layout.alignItemsCenter]}>
          <Text
            color={Colors.neutral[100]}
            variant="semibold"
            style={[Gutters.tinyVMargin]}>
            {item?.name}
          </Text>
          <View style={[Layout.rowHCenter]}>
            <View style={[Layout.rowHCenter]}>
              <Icon name="arrow-up-outline" color={Colors.primary[600]} />
              <Text color={Colors.white} style={[{ marginLeft: 2 }]} size="xs">
                {`+${item?.totalRating}`}
              </Text>
            </View>
            <View style={[Layout.rowHCenter, Gutters.smallHMargin]}>
              <Icon name="file-text" color={Colors.primary[600]} />
              <Text color={Colors.white} style={[{ marginLeft: 1 }]} size="xs">
                324
              </Text>
            </View>
            <View style={[Layout.rowHCenter]}>
              <Icon name="users" color={Colors.primary[600]} />
              <Text color={Colors.white} style={[{ marginLeft: 2 }]} size="xs">
                {item?.totalMember}
              </Text>
            </View>
          </View>
        </View>
      </FastImage>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
  },
});
