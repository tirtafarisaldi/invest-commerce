/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import {Button} from '@Atom/Button';
import {IconName} from '@Atom/index';
import Text from '@Atom/Text';

export interface FooterProps {
  leftElement: {
    count?: number;
    icon: IconName;
    color?: string;
    onPress?: VoidFunction;
  }[];
  rightElement?: JSX.Element;
}

const Footer = (props: FooterProps) => {
  const {leftElement, rightElement} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {leftElement.map(el => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={`${el.icon}`}>
              <Button
                type="iconOnly"
                icon={el.icon}
                noBorder
                style={{
                  marginRight: -5,
                }}
                onPress={el.onPress}
              />
              {el.count ? (
                <Text
                  text={`${el.count}`}
                  style={{
                    marginRight: -5,
                  }}
                  color={el.color}
                />
              ) : null}
            </View>
          );
        })}
      </View>

      {rightElement && rightElement}
    </View>
  );
};

export default Footer;
