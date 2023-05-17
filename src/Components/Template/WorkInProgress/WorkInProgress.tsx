import {View, ViewProps} from 'react-native';
import React from 'react';
import {Text} from '@Atom/index';
import useTheme from '@Hooks/useTheme';
import FastImage from 'react-native-fast-image';
import {height, width} from '@Theme/Layout';
import {useTranslation} from 'react-i18next';

const WorkInProgress = ({style, ...props}: ViewProps) => {
  const {Layout, Common, Colors, Gutters, Images, Fonts} = useTheme();
  const {t} = useTranslation();

  const _getStyle = () => (Array.isArray(style) ? style : [style]);

  return (
    <View
      style={[
        Layout.fill,
        Layout.center,
        Common.backgroundLayout,
        Gutters.smallPadding,
        ..._getStyle(),
      ]}
      {...props}>
      <FastImage
        source={Images.workInProgress}
        style={[{height: width / 1.5, width: width / 1.5}]}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text
        style={[Fonts.textCenter]}
        variant="semibold"
        size="base"
        color={Colors.neutral[500]}>
        {t('workInProgress.oops')}
      </Text>
      <Text
        style={[Fonts.textCenter, Gutters.tinyTMargin]}
        color={Colors.neutral[400]}>
        {t('workInProgress.bePatient')}
      </Text>
    </View>
  );
};

export default WorkInProgress;
