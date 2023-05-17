import {Icon, Text} from '@Atom/index';
import useTheme from '@Hooks/useTheme';
import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function PlayCard({width, title, img}: any) {
  const {Gutters, Colors, Layout, Images, Common} = useTheme();

  return (
    <View
      style={[
        Gutters.smallPadding,
        {
          width: width,
          borderWidth: 1,
          borderRadius: 24,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          backgroundColor: Colors.neutral[100],
          borderColor: Colors.neutral[200],
        },
      ]}>
      <View style={[Layout.rowHCenter, Layout.scrollSpaceBetween]}>
        <Text variant="semibold">{title}</Text>
        <View
          style={[
            Gutters.smallHPadding,
            Layout.rowHCenter,
            {
              backgroundColor: Colors.primary[100],
              borderRadius: 99,
              paddingVertical: 2,
            },
          ]}>
          <Icon name="gift" color={Colors.primary[600]} />
          <View style={Gutters.tinyLMargin}>
            <Text size="xs" color={Colors.primary[600]} variant="semibold">
              IDR 10.000.000
            </Text>
          </View>
        </View>
      </View>
      <View style={[Gutters.tinyTMargin]}>
        <View style={[Layout.rowHCenter, Layout.scrollSpaceBetween]}>
          <View>
            <View style={[Layout.rowHCenter, Gutters.tinyBMargin]}>
              <Icon name="users" />
              <View style={Gutters.tinyLMargin}>
                <Text size="xs">5/10</Text>
              </View>
            </View>
            <View style={[Layout.rowHCenter, Gutters.tinyBMargin]}>
              <Icon name="clock" />
              <View style={Gutters.tinyLMargin}>
                <Text size="xs">29 February 2023</Text>
              </View>
            </View>
            <View style={[Layout.rowHCenter, Gutters.tinyBMargin]}>
              <Icon name="dollar-sign" />
              <View style={Gutters.tinyLMargin}>
                <Text size="xs">Free</Text>
              </View>
            </View>
            <View style={[Layout.rowHCenter, Gutters.tinyBMargin]}>
              <Icon name="info" color={Colors.info[600]} />
              <View style={Gutters.tinyLMargin}>
                <Text size="xs">Arena</Text>
              </View>
            </View>
            {/* <View style={[Layout.rowHCenter, Gutters.tinyVPadding]}>
              <TouchableOpacity
                style={[
                  Gutters.smallHPadding,
                  {backgroundColor: Colors.primary[600], borderRadius: 99},
                ]}>
                <Text size="xs" variant="semibold" color={Colors.neutral[100]}>
                  Get a Ticket
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
          <View>
            <FastImage
              source={img}
              resizeMode="contain"
              style={{width: 120, height: 120}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
