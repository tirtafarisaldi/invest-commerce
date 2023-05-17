import {Pressable, StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import {Icon, Text} from '@Atom/index';
import useTheme from '@Hooks/useTheme';

interface INumpad extends ViewProps {
  value: string;
  onChangeValue: (value: string) => void;
  maxLength?: number;
}

const Numpad = ({value, onChangeValue, maxLength = 6, ...props}: INumpad) => {
  const {Colors, Layout, Gutters, Fonts} = useTheme();

  const getNumStyle = ({pressed}: {pressed: boolean}): StyleProp<ViewStyle> => {
    return [
      Layout.fill,
      Layout.center,
      {
        paddingVertical: 25,
        backgroundColor: pressed ? Colors.primary[100] : Colors.white,
      },
    ];
  };

  return (
    <View {...props}>
      <View style={[Layout.rowCenter]}>
        <Pressable
          style={getNumStyle}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}1`)}>
          <Text size="xl2" variant="semibold">
            1
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => getNumStyle({pressed})}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}2`)}>
          <Text size="xl2" variant="semibold">
            2
          </Text>
        </Pressable>
        <Pressable
          style={getNumStyle}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}3`)}>
          <Text size="xl2" variant="semibold">
            3
          </Text>
        </Pressable>
      </View>
      <View style={[Layout.rowCenter]}>
        <Pressable
          style={getNumStyle}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}4`)}>
          <Text size="xl2" variant="semibold">
            4
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => getNumStyle({pressed})}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}5`)}>
          <Text size="xl2" variant="semibold">
            5
          </Text>
        </Pressable>
        <Pressable
          style={getNumStyle}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}6`)}>
          <Text size="xl2" variant="semibold">
            6
          </Text>
        </Pressable>
      </View>
      <View style={[Layout.rowCenter]}>
        <Pressable
          style={getNumStyle}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}7`)}>
          <Text size="xl2" variant="semibold">
            7
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => getNumStyle({pressed})}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}8`)}>
          <Text size="xl2" variant="semibold">
            8
          </Text>
        </Pressable>
        <Pressable
          style={getNumStyle}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}9`)}>
          <Text size="xl2" variant="semibold">
            9
          </Text>
        </Pressable>
      </View>
      <View style={[Layout.rowCenter]}>
        <Pressable style={getNumStyle} disabled>
          <Text size="xl2" variant="semibold">
            {' '}
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => getNumStyle({pressed})}
          onPress={() => onChangeValue(`${value.slice(0, maxLength - 1)}0`)}>
          <Text size="xl2" variant="semibold">
            0
          </Text>
        </Pressable>
        <Pressable
          style={getNumStyle}
          onPress={() => onChangeValue(value.slice(0, -1))}>
          <View style={[{paddingVertical: 3}]}>
            <Icon name="delete" size={'xl2'} color={Colors.neutral[400]} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Numpad;
