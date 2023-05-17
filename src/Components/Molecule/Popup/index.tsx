/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import Text from '@Atom/Text';
import {Colors} from '@Theme/Variables';
import {Icon, IconName} from '@Atom/index';
import Separator from '@Atom/Separator';

export interface PopupProps {
  contents: {
    name: string;
    icon?: IconName;
    color?: {
      icon?: string;
      name?: string;
    };
  }[];
}

const Popup = (props: PopupProps) => {
  const {contents} = props;
  return (
    <View
      style={{
        maxWidth: 157,
        borderRadius: 12,
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.9,
        shadowRadius: 2.62,
        elevation: 8,
        backgroundColor: Colors.white,
        paddingHorizontal: 17,
        paddingVertical: 14,
        position: 'absolute',
      }}>
      {contents.map((content, i) => {
        const isLastContent = contents.length === i + 1;
        return (
          <>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}>
              {content.icon ? (
                <View
                  style={{
                    marginRight: 10,
                  }}>
                  <Icon name={content.icon} color={content.color?.icon} />
                </View>
              ) : null}
              <Text text={content.name} color={content.color?.name} />
            </View>
            {isLastContent ? null : (
              <Separator
                variant="horizontal"
                size={{
                  height: 2,
                }}
                margin={14}
              />
            )}
          </>
        );
      })}
    </View>
  );
};

export default Popup;
