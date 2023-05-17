import {View, ViewProps, TouchableOpacity} from 'react-native';
import React from 'react';
import {DonutChart} from '@Molecule/DonutChart';
import Layout from '@Theme/Layout';
import useTheme from '@Hooks/useTheme';
import {Avatar} from '@Atom/Avatar';
import Icon from '@Atom/Icon';
import Text from '@Atom/Text';
import FastImage from 'react-native-fast-image';
import hashtagFormatter from '@Utils/hashtagFormatter';

interface IPostCard extends ViewProps {
  userData?: any; // to define later
  contentType?: 'pie' | 'image' | 'text'; // also to define later
}

const PostCard = ({userData, contentType = 'text', ...props}: IPostCard) => {
  const {Layout, Common, Gutters, Fonts, Colors, Images} = useTheme();

  const pieData = [
    {
      color: '#FFA409',
      value: 28,
    },
    {
      color: '#FF4488',
      value: 25,
    },
    {
      color: '#E6FF44',
      value: 20,
    },
    {
      color: '#5E44FF',
      value: 17,
    },
    {
      color: '#39CEF3',
      value: 10,
    },
  ];

  return (
    <View style={[Layout.row, Gutters.smallBMargin, props.style]} {...props}>
      <View>
        <Avatar size={50} />
      </View>
      <View style={[Gutters.smallLMargin]}>
        <View style={[Layout.rowHCenter]}>
          <View style={[Layout.fill]}>
            <View style={[Layout.rowHCenter]}>
              <Text variant="semibold" color={Colors.neutral[500]}>
                Ismael Misbah
              </Text>
              <FastImage
                source={Images.profile.sprout}
                style={[
                  Gutters.tinyBMargin,
                  Gutters.tinyHMargin,
                  {width: 20, height: 20},
                ]}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View
                style={[
                  Layout.round,
                  {
                    backgroundColor: Colors.primary[100],
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                  },
                ]}>
                <Text size="xs" color={Colors.primary[600]}>
                  Admin
                </Text>
              </View>
            </View>
            <View style={[Layout.rowHCenter]}>
              <Text
                size="xs"
                color={Colors.neutral[400]}
                style={[Gutters.tinyRMargin]}>
                @ismael
              </Text>
              <Icon name="dot" size={5} color={Colors.neutral[500]} />
              <Text
                size="xs"
                color={Colors.neutral[400]}
                style={[Gutters.tinyHMargin]}>
                09/03/2022
              </Text>
              <Icon name="dot" size={5} color={Colors.neutral[500]} />
              <Text
                size="xs"
                color={Colors.neutral[400]}
                style={[Gutters.tinyLMargin]}>
                12.39 PM
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="dots" />
          </TouchableOpacity>
        </View>
        <Text style={[Gutters.smallTMargin]}>
          {hashtagFormatter(
            `#NFT3d #NFTPostedArt \nI just bought an asset using the copy pie feature`,
          )}
        </Text>
        {/* PIE CONTENT, should be made as component later */}
        {contentType === 'pie' ? (
          <View
            style={[
              Layout.smallRound,
              Gutters.tinyTMargin,
              Gutters.smallPadding,
              {backgroundColor: Colors.neutral[200]},
            ]}>
            <View style={[Layout.row, Layout.justifyContentBetween]}>
              <View style={[{flex: 1}]}>
                <View style={[Layout.rowHCenter, Gutters.tinyBMargin]}>
                  <Avatar size={40} borderColor={Colors.secondary[600]} />
                  <Text
                    size="xs"
                    variant="semibold"
                    style={[Gutters.tinyHMargin]}>
                    Ismail Mesbah (YOU)
                  </Text>
                  <Icon
                    name="check-circle-filled"
                    color={Colors.secondary[600]}
                  />
                </View>
                <Text variant="semibold" size="xs">
                  Stock-feature
                </Text>
                <View style={[Layout.rowHCenter, {flexWrap: 'wrap'}]}>
                  {new Array(3).fill('').map((o, idx) => (
                    <FastImage
                      key={idx}
                      source={Images.profile[`sampleStock${idx + 1}`]}
                      style={[{width: 20, height: 20, marginRight: 2}]}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  ))}
                </View>
                <Text
                  size="xs"
                  variant="semibold"
                  style={[Gutters.tinyTMargin]}>
                  Rp 61.153.000
                </Text>
              </View>
              <View>
                <DonutChart data={pieData} size={80} value={'+47%'} />
                <TouchableOpacity
                  style={[
                    Layout.rowCenter,
                    Layout.smallRound,
                    Gutters.tinyVMargin,
                    {
                      backgroundColor: Colors.secondary[600],
                      paddingVertical: 3,
                    },
                  ]}>
                  <Icon name="copy-2" size="xs" color={Colors.white} />
                  <Text
                    size="xs"
                    color={Colors.white}
                    style={[{marginLeft: 2}]}>
                    Copy Pie
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                Layout.rowHCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
              ]}>
              <View style={[Layout.rowHCenter]}>
                <Icon name="eye" color={Colors.secondary[600]} />
                <Text variant="semibold" size="xs" style={{marginLeft: 3}}>
                  Friends Only
                </Text>
              </View>
              <Text size={10} color={Colors.neutral[400]}>
                1/04/2022,19:05:50 WIB
              </Text>
            </View>
          </View>
        ) : null}
        {/* FOOTER, should also be made as component later */}
        <View style={[Layout.rowHCenter, Gutters.tinyTMargin]}>
          <View style={[Layout.fill, Layout.rowHCenter, {flexWrap: 'wrap'}]}>
            <TouchableOpacity>
              <Icon name="arrow-up-outline" />
            </TouchableOpacity>
            <Text
              size="sm"
              color={Colors.primary[500]}
              style={[Gutters.tinyHMargin]}>
              +38
            </Text>
            <TouchableOpacity>
              <Icon name="arrow-down-outline" />
            </TouchableOpacity>
            <Text
              size="sm"
              color={Colors.primary[500]}
              style={[Gutters.tinyHMargin]}>
              {/* +38 */}
            </Text>
            <TouchableOpacity>
              <Icon name="chat-bubble-round" />
            </TouchableOpacity>
            <Text size="sm" style={[Gutters.tinyHMargin]}>
              16
            </Text>
            <TouchableOpacity>
              <Icon name="share-2" />
            </TouchableOpacity>
          </View>
          <View style={[Layout.rowHCenter, {flexWrap: 'wrap'}]}>
            <TouchableOpacity>
              <Icon name="pin-rotated" />
            </TouchableOpacity>
            <TouchableOpacity style={[Gutters.tinyLMargin]}>
              <Icon name="bookmark-filled" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
