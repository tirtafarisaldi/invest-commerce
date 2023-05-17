import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {useTranslation} from 'react-i18next';
import Icon from '@Atom/Icon';

interface ITabBar extends ViewProps {
  indexActive: number;
  setIndexActive: (val: number) => void;
}

const TabBar = ({indexActive, setIndexActive, ...props}: ITabBar) => {
  const {Layout, Common, Gutters, Colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View
      style={[Layout.row, Layout.alignItemsStart, Common.backgroundLayout]}
      {...props}>
      <TouchableOpacity
        style={[Layout.fill, Layout.center, Gutters.smallVPadding]}
        onPress={() => setIndexActive(0)}>
        <Icon
          name="social"
          size="xl"
          color={indexActive === 0 ? Colors.primary[600] : Colors.neutral[400]}
        />
        <Text
          size="xs"
          style={[Gutters.tinyTMargin]}
          color={indexActive === 0 ? Colors.primary[600] : Colors.neutral[400]}>
          Social
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Layout.fill, Layout.center, Gutters.smallVPadding]}
        onPress={() => setIndexActive(1)}>
        <Icon
          name="users"
          size="xl"
          color={indexActive === 1 ? Colors.primary[600] : Colors.neutral[400]}
        />
        <Text
          size="xs"
          style={[Gutters.tinyTMargin]}
          color={indexActive === 1 ? Colors.primary[600] : Colors.neutral[400]}>
          Connect
        </Text>
      </TouchableOpacity>
      <View
        style={[
          Layout.fill,
          Common.backgroundLayout,
          Layout.round,
          Gutters.smallPadding,
          {marginTop: -20, height: Dimensions.get('window').width / 4},
        ]}>
        <TouchableOpacity
          style={[
            Layout.fill,
            Layout.center,
            Layout.round,
            {
              backgroundColor: Colors.primary[600],
            },
          ]}>
          <Icon name="plus" size="xl4" color={Colors.white} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[Layout.fill, Layout.center, Gutters.smallVPadding]}
        onPress={() => setIndexActive(2)}>
        <Icon
          name="compass"
          size="xl"
          color={indexActive === 2 ? Colors.primary[600] : Colors.neutral[400]}
        />
        <Text
          size="xs"
          style={[Gutters.tinyTMargin]}
          color={indexActive === 2 ? Colors.primary[600] : Colors.neutral[400]}>
          Discover
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Layout.fill, Layout.center, Gutters.smallVPadding]}
        onPress={() => setIndexActive(3)}>
        <Icon
          name="joystick"
          size="xl"
          color={indexActive === 3 ? Colors.primary[600] : Colors.neutral[400]}
        />
        <Text
          size="xs"
          style={[Gutters.tinyTMargin]}
          color={indexActive === 3 ? Colors.primary[600] : Colors.neutral[400]}>
          Play
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
