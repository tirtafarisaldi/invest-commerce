import {View} from 'react-native';
import React from 'react';
import useTheme from '@Hooks/useTheme';
import FastImage from 'react-native-fast-image';
import {Icon, Text} from '@Atom/index';

export default function AssetTrendingCard({item}: any) {
  const {Gutters, Colors, Layout, Images, Common} = useTheme();

  function formatMoney(number: number) {
    return number.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'});
  }

  return (
    <View
      style={[
        Gutters.smallPadding,
        {
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          backgroundColor: Colors.neutral[100],
        },
      ]}>
      <View style={[Layout.rowHCenter, Layout.scrollSpaceBetween]}>
        <View style={[Layout.rowHCenter, Gutters.tinyHPadding]}>
          <FastImage
            source={{uri: item?.image}}
            style={{width: 18, height: 18}}
            resizeMode="contain"
          />
          <View style={Gutters.tinyLMargin}>
            <Text size={'xs'} variant="semibold">
              {item?.name}
            </Text>
          </View>
        </View>
        <View style={[Gutters.largeLMargin]}>
          <FastImage
            source={Images.discover.assetUp}
            style={{width: 18, height: 18}}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={[Layout.rowHCenter, Layout.scrollSpaceBetween]}>
        <View
          style={[
            Layout.rowHCenter,
            Gutters.tinyHPadding,
            Gutters.tinyTMargin,
          ]}>
          <Text size="xs" variant="semibold">
            {formatMoney(item?.price)}
          </Text>
        </View>
        <View
          style={[
            Gutters.largeLMargin,
            Layout.rowHCenter,
            Layout.alignItemsCenter,
          ]}>
          <View style={Gutters.tinyRMargin}>
            <Icon size="xs" name="dot" color={Colors.neutral[300]} />
          </View>
          <Text size="xs">{`${item?.regularPercentage}%`}</Text>
        </View>
      </View>
    </View>
  );
}
