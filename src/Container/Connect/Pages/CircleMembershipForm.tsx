import React, { Fragment, useEffect, useState } from 'react';
import { HeaderTitle } from '@Molecule/Header';
import { Container, Content } from '@Organism/Basic';
import FastImage from 'react-native-fast-image';
import useTheme from '@Hooks/useTheme';
import { width } from '@Theme/Layout';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@Atom/index';
import { FontSize } from '@Theme/Variables';
import { RootStackParamList, navigate } from '@Navigators/utils';
import { StackScreenProps } from '@react-navigation/stack';

let subsData = {
  type: 'monthly',
  value: 100000,
  formattedValue: 'Rp. 100.000',
  data: [
    {
      value: 30000,
      formattedValue: 'Rp. 30.000',
      text: '1 Month',
    },
    {
      value: 90000,
      formattedValue: 'Rp. 90.000',
      text: '3 Month',
    },
    {
      value: 120000,
      formattedValue: 'Rp. 120.000',
      text: '6 Month',
    },
    {
      value: 150000,
      formattedValue: 'Rp. 150.000',
      text: '12 Month',
    },
  ],
}

type Props = StackScreenProps<RootStackParamList, 'CircleMembershipForm'>;

const CircleMembershipForm = (props: Props) => {
  const { t } = useTranslation();
  const { Gutters, Colors, Images, Layout } = useTheme()

  const [selectedOption, setSelectedOption] = useState<any>(null)

  const isLifetime = props.route.params?.isLifetime

  const handleSelectOption = (key: number) => {
    setSelectedOption(key)
  }

  return (
    <Container>
      <HeaderTitle title={'Fee Membership'} showAvatarProfile={true} />
      <Content contentContainerStyle={[{ flexGrow: 1 }]} showsVerticalScrollIndicator={false}>
        <View style={[Gutters.regularTMargin, Gutters.regularPadding, { backgroundColor: Colors.white, flexGrow: 1 }]}>
          <View style={[Layout.center]}>
            <FastImage
              source={Images.circleJoin.membershipFeeAvatar}
              style={[{ width: 180, height: 240, marginTop: -24 }]}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View
              style={{
                width: width / 2,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: -10,
                marginBottom: 24
              }}
            />
          </View>
          <Text style={{ textAlign: 'center' }} size={'xl'} variant='semibold'>{t('connect.getMembershipInfoMain')}</Text>
          <Text style={{ textAlign: 'center' }} color={Colors.neutral[400]}>{t('connect.getMembershipInfoDesc')}</Text>
          {isLifetime ? (
            null
          ) : (
            <Fragment>
              <Text style={[Gutters.regularTMargin]} variant='semibold' size={'base'}>Set Time Subscription</Text>
              <View style={[Layout.row, { flexWrap: 'wrap', alignItems: 'flex-start' }]}>
                {subsData.data.map((option, i) => {
                  return (
                    i !== selectedOption ? (
                      <View style={{ width: '50%' }}>
                        <Button
                          key={i}
                          type='outline'
                          title={option.text}
                          titleVariant='normal'
                          titleStyle={{ color: Colors.black, fontSize: FontSize.sm }}
                          style={[{ borderColor: Colors.neutral[300], maxHeight: 40 }]}
                          onPress={() => handleSelectOption(i)}
                        />
                      </View>
                    ) : (
                      <View style={{ width: '50%' }}>
                        <Button
                          key={i}
                          title={option.text}
                          titleVariant='normal'
                          titleStyle={{ color: Colors.white, fontSize: FontSize.sm }}
                          style={[{ borderColor: Colors.neutral[300], maxHeight: 40 }]}
                          onPress={() => handleSelectOption(i)}
                        />
                      </View>
                    )
                  )
                })}
              </View>
            </Fragment>
          )}

          <View style={[Gutters.largeTMargin, {
            borderWidth: 1,
            borderColor: Colors.secondary[600],
            borderRadius: 10,
          }]}>
            <View style={[Gutters.smallHPadding, Gutters.tinyVPadding, {
              backgroundColor: Colors.secondary[600],
              borderColor: Colors.secondary[600],
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }]}>
              <Text variant='semibold' color={Colors.white}>{isLifetime ? 'Lifetime Access' : 'Subscription'}</Text>
            </View>
            <View style={[Gutters.smallPadding, {
              alignItems: 'center',
            }]}>
              <Text variant='semibold' style={{ textAlign: 'center' }}>{
                isLifetime
                  ? subsData.formattedValue
                  : selectedOption === null
                    ? '-'
                    : subsData.data[selectedOption].formattedValue
              }</Text>
              {isLifetime ? (
                <Text color={Colors.neutral[400]} style={{ textAlign: 'center' }}>Get full access by paying once for a lifetime</Text>
              ) : (
                <Text color={Colors.neutral[400]} style={{ textAlign: 'center' }}>Get full access according to your subscription time</Text>
              )}
            </View>
          </View>
          <Button
            key={'nexbutton'}
            title={'Next'}
            titleVariant='semibold'
            titleStyle={{ color: Colors.white, fontSize: FontSize.sm }}
            style={[{ borderColor: Colors.neutral[300], maxHeight: 40, marginTop: 24 }]}
            onPress={() => { }}
          />
        </View>
      </Content>
    </Container>)
}

export default CircleMembershipForm;