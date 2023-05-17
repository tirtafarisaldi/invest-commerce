import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import useTheme from '@Hooks/useTheme';
import FastImage from 'react-native-fast-image';
import {Text} from '@Atom/index';
import ButtonSimple from '@Atom/Button/ButtonSimple';
import {useTranslation} from 'react-i18next';

export default function PeopleCard({data}: any) {
  const {Gutters, Colors, Layout, Images, Common} = useTheme();
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      // onPress={() => toDetailScreen('ProfileUserScreen')}
      style={[
        Gutters.smallPadding,
        Layout.rowCenter,
        Layout.scrollSpaceBetween,
        Gutters.smallBMargin,
        {
          backgroundColor: '#F9F9F9',
          borderColor: Colors.neutral[200],
          borderWidth: 1,
          borderRadius: 12,
        },
      ]}>
      <View style={[Layout.rowCenter]}>
        <FastImage
          source={{uri: data?.avatar}}
          resizeMode={FastImage.resizeMode.contain}
          style={[{width: 40, height: 40}]}
        />
        <View style={[Gutters.smallLMargin]}>
          <View style={[Layout.rowHCenter]}>
            <View style={[Gutters.tinyRMargin]}>
              <Text variant="bold">{data?.name}</Text>
            </View>
            <FastImage
              source={Images.discover.one}
              resizeMode={FastImage.resizeMode.contain}
              style={[{width: 20, height: 20}]}
            />
          </View>
          <Text variant="light" color={Colors.neutral[400]}>
            {`@${data?.seedsTag}`}
          </Text>
          <Text>{`${data?.followers} Followers`}</Text>
        </View>
      </View>
      <View>
        <ButtonSimple
          title={t('searchScreen.follow')}
          onPress={() => {
            console.log('follow button');
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
