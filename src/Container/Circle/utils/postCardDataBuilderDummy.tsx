/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Image} from 'react-native';
import {Button} from '@Atom/Button';
import Text from '@Atom/Text';
import {Colors} from '@Theme/Variables';
import {type PostCardProps} from '../Components/CirclePostCard';

export const postCardDataBuilder = ({
  vote,
  upVote,
  downVote,
}: {
  vote: number;
  upVote: VoidFunction;
  downVote: VoidFunction;
}): {
  data: PostCardProps[];
} => {
  return {
    data: [
      {
        heading: {
          author: {
            name: '@aguswarewolf',
            label: 'Admin',
            profilePicture: {
              uri: 'https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg',
            },
            online: true,
          },
          createdAt: {
            date: '09/03/2022',
            time: '12.39 PM',
          },
          rightElement: (
            <Button
              iconSize={'xl3'}
              type="iconOnly"
              icon="more-vertical"
              noBorder
            />
          ),
        },

        content: (
          <>
            <Text text="#NFT #NFTPostedArt" color={Colors.secondary[600]} />
            <Text
              text="I just bought an asset using the copy pie feature"
              size={'xs'}
              style={{
                marginBottom: 8,
              }}
            />
            <Image
              style={[
                {
                  backgroundColor: 'black',
                  height: 200,
                  borderRadius: 20,
                },
              ]}
              source={{
                uri: 'https://akcdn.detik.net.id/visual/2022/11/08/ilustrasi-bitcoin_169.jpeg?w=650&q=90',
              }}
            />
          </>
        ),
        footer: {
          leftElement: [
            {
              icon: 'arrow-up',
              count: vote,
              onPress: upVote,
              color:
                vote > 0
                  ? Colors.primary[600]
                  : vote < 1
                  ? Colors.red[600]
                  : Colors.red[600],
            },
            {
              icon: 'arrow-down',
              onPress: downVote,
            },
            {
              icon: 'chat-bubble',
              count: 16,
            },
            {
              icon: 'share',
            },
          ],
          rightElement: (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Button
                type="iconOnly"
                icon="pin-2"
                noBorder
                style={{
                  marginRight: -5,
                }}
              />
              <Button type="iconOnly" icon="bookmark" noBorder />
            </View>
          ),
        },
      },
      {
        heading: {
          author: {
            name: '@aguswarewolf',
            label: 'Admin',
            profilePicture: {
              uri: 'https://cdnb.artstation.com/p/assets/images/images/008/898/373/large/henry-qiu-asset.jpg?1515982395',
            },
            online: true,
          },
          createdAt: {
            date: '09/03/2022',
            time: '12.39 PM',
          },
          rightElement: (
            <Button
              iconSize={'xl3'}
              type="iconOnly"
              icon="more-vertical"
              noBorder
            />
          ),
        },

        content: (
          <>
            <Text text="#NFT #NFTPostedArt" color={Colors.secondary[600]} />
            <Text
              text="I just bought an asset using the copy pie feature"
              size={'xs'}
              style={{
                marginBottom: 8,
              }}
            />
            <Image
              style={[
                {
                  backgroundColor: 'black',
                  height: 200,
                  borderRadius: 20,
                },
              ]}
              source={{
                uri: 'https://akcdn.detik.net.id/visual/2022/11/08/ilustrasi-bitcoin_169.jpeg?w=650&q=90',
              }}
            />
          </>
        ),
        footer: {
          leftElement: [
            {
              icon: 'arrow-up',
              count: vote,
              onPress: upVote,
              color:
                vote > 0
                  ? Colors.primary[600]
                  : vote < 1
                  ? Colors.red[600]
                  : Colors.black,
            },
            {
              icon: 'arrow-down',
              onPress: downVote,
            },
            {
              icon: 'chat-bubble',
              count: 16,
            },
            {
              icon: 'share',
            },
          ],
          rightElement: (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Button
                type="iconOnly"
                icon="pin-2"
                noBorder
                style={{
                  marginRight: -5,
                }}
              />
              <Button type="iconOnly" icon="bookmark" noBorder />
            </View>
          ),
        },
      },
    ],
  };
};
