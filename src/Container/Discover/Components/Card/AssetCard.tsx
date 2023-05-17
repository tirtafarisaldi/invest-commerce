import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import useTheme from '@Hooks/useTheme';
import FastImage from 'react-native-fast-image';
import Text from '@Atom/Text';
import Icon from '@Atom/Icon';

export default function AssetCard({item}: any) {
  const {Common, Gutters, Layout, Images, Colors} = useTheme();

  function formatMoney(number: number) {
    return number.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'});
  }

  return (
    <TouchableOpacity
      // onPress={() => toDetailScreen('AssetDetailScreen')}
      style={[
        Gutters.smallPadding,
        {backgroundColor: '#F9F9F9', borderRadius: 12},
        Layout.row,
        Layout.scrollSpaceBetween,
      ]}>
      <View style={[Layout.row, Layout.alignItemsCenter, {width: '50%'}]}>
        <FastImage
          source={{uri: item?.image}}
          resizeMode={FastImage.resizeMode.contain}
          style={[{width: 40, height: 40}]}
        />
        <View style={[Gutters.smallLMargin]}>
          <Text variant="semibold">{item?.quote}</Text>
          <Text color={Colors.neutral[400]}>{item?.name}</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text variant="semibold">{formatMoney(item?.price)}</Text>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            {
              justifyContent: 'flex-end',
            },
          ]}>
          <View style={[Gutters.tinyRMargin]}>
            <Icon
              name={
                item?.regularPercentage > 0 ? 'trending-up' : 'trending-down'
              }
              color={'#5E44FF'}
            />
          </View>
          <Text
            color={'#5E44FF'}
            style={[Layout.row, {justifyContent: 'flex-end'}]}>
            {`${item?.regularPercentage.toFixed(2)}%`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
