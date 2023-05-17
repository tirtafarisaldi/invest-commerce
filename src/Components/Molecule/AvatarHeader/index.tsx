/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Text from '@Atom/Text';
import Label from '@Atom/Label';
import {Avatar} from '@Atom/Avatar';
import {Colors} from '@Theme/Variables';

export interface AvatarHeaderProps {
  author: {
    name: string;
    label?: string;
    profilePicture: {
      uri: string;
    };
    online?: boolean;
  };
  createdAt?: {
    date: string;
    time: string;
  };
  rightElement?: JSX.Element;
  description?: string;
}

const AvatarHeader = (props: AvatarHeaderProps) => {
  const {author, createdAt, rightElement, description} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Avatar
          size={48}
          imageUrl={author.profilePicture.uri}
          isOnline={author.online}
          style={{
            marginRight: 19,
          }}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              text={author.name}
              variant="bold"
              style={{
                marginRight: 10,
              }}
            />
            {author.label && (
              <Label
                title={author.label}
                color={{
                  text: Colors.primary[600],
                  background: Colors.primary[100],
                }}
              />
            )}
          </View>
          {description ? (
            <Text text={description} color={Colors.neutral[300]} />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                text={createdAt?.date}
                color={Colors.neutral[300]}
                style={{
                  marginRight: 10,
                }}
              />
              <Text text={createdAt?.time} color={Colors.neutral[300]} />
            </View>
          )}
        </View>
      </View>
      {rightElement && rightElement}
    </View>
  );
};

export default AvatarHeader;
