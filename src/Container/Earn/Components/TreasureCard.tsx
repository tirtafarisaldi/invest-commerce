import {View, ImageBackground, TouchableOpacity, ViewProps} from 'react-native';
import React from 'react';
import useTheme from '@Hooks/useTheme';
import Icon from '@Atom/Icon';
import Text from '@Atom/Text';
import {earnStyle} from '../Style/style';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

interface IInputField extends ViewProps {
  date?: any;
  disabled?: boolean;
  title?: string;
  description?: string;
  expDate?: any;
  onButtonPress?: any;
}

export default function TreasureCard({
  disabled = false,
  title,
  description,
  expDate,
  onButtonPress,
}: IInputField) {
  const {t} = useTranslation();
  const {Common, Gutters, Layout, Images, Colors, Fonts} = useTheme();

  return (
    <View style={{alignItems: 'center'}}>
      <ImageBackground
        source={disabled ? Images.earn.treasureOff : Images.earn.treasureOn}
        resizeMode="contain"
        style={[earnStyle.treasureCardWrap]}>
        <View style={[Gutters.largeLMargin, Layout.rowHCenter]}>
          <Icon
            name="box1"
            size="xl5"
            color={disabled ? Colors.neutral[300] : Colors.primary[600]}
          />
          <View style={[Gutters.largeLMargin, {width: '60%'}]}>
            <Text
              size="sm"
              variant="semibold"
              numberOfLines={1}
              color={disabled ? Colors.neutral[300] : Colors.neutral[500]}>
              {title}
            </Text>
            <Text color={Colors.neutral[300]} numberOfLines={2} size="xs">
              {description}
            </Text>
            {disabled ? null : (
              <TouchableOpacity
                onPress={onButtonPress}
                style={[
                  Gutters.tinyTMargin,
                  earnStyle.roundFifty,
                  {
                    backgroundColor: Colors.primary[600],
                  },
                ]}>
                <Text
                  style={Fonts.textCenter}
                  color={Colors.neutral[100]}
                  size="xs">
                  {t('earnScreen.claimNow')}
                </Text>
              </TouchableOpacity>
            )}
            {!disabled ? (
              <View style={Gutters.tinyTMargin}>
                <Text
                  size="xs"
                  color={Colors.neutral[300]}>{`Exp Date: ${moment(
                  expDate,
                ).format('DD MMMM YYYY')}`}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
