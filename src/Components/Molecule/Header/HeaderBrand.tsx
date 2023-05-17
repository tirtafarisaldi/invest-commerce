import useTheme from '@Hooks/useTheme';
import {navigateBack} from '@Navigators/utils';
import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {HeaderWrapper, IHeaderBack} from './index';
import Icon from '@Atom/Icon';
import {Colors} from '@Theme/Variables';
import i18n from 'src/Translations';
import {useTranslation} from 'react-i18next';
import Layout from '@Theme/Layout';

const HeaderBrand = ({onPress, iconColor}: IHeaderBack) => {
  const {Common, Images, Fonts} = useTheme();
  const defaultAction: VoidFunction = () => {
    navigateBack();
  };

  const [language, setLanguage] = useState('ID');
  const [flag, setFlag] = useState('🇮🇩');
  const [showOptionChangeLanguage, setShowOptionChangeLanguage] =
    useState(false);

  const {t} = useTranslation();

  const countrySelector = [
    {
      name: t('countrySelector.indonesia'),
      flag: '🇮🇩',
      code: 'ID',
      value: 'id',
      dial_code: '+62',
      color: 'blue',
    },
    {
      name: t('countrySelector.england'),
      flag: '🇬🇧',
      code: 'EN',
      value: 'en',
      dial_code: '+44',
      color: 'red',
    },
  ];

  return (
    <HeaderWrapper style={[Common.header.headerBrandContent, {zIndex: 1000}]}>
      <FastImage
        source={Images.text_logo}
        style={[
          Common.header.headerLogo,
          {marginTop: 'auto', marginBottom: 'auto'},
        ]}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Pressable
        onPress={() => {
          // i18n.changeLanguage('en'),
          setShowOptionChangeLanguage(!showOptionChangeLanguage);
        }}>
        <View
          style={{
            height: 30,
            width: 70,
            marginRight: 21,
            marginTop: 'auto',
            marginBottom: 'auto',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderBottomLeftRadius: showOptionChangeLanguage ? null : 12,
            borderBottomRightRadius: showOptionChangeLanguage ? null : 12,
            flex: 1,
            flexDirection: 'row',
            padding: 5,
            shadowColor: '#000',
            backgroundColor: 'white',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: Platform.OS === 'android' ? 13 : null,
            // position: 'relative',
          }}>
          <View
            style={{
              flex: 2.25,
              marginRight: 'auto',
            }}>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto',
                color: Colors.black,
              }}>
              {flag}
            </Text>
          </View>
          <View
            style={{
              flex: 2.25,
            }}>
            <Text
              style={{
                fontSize: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto',
                fontWeight: 'bold',
              }}>
              {language}
            </Text>
          </View>

          <View
            style={{
              flex: 1.5,
            }}>
            <View
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}>
              <Icon
                name={showOptionChangeLanguage ? 'chevron-up' : 'chevron-down'}
                size={15}
                color={Colors.neutral[300]}
              />
            </View>
          </View>
        </View>
        {showOptionChangeLanguage ? (
          <View
            style={{
              position: 'absolute',
              height: 45,
              width: 70,
              top: 40,
              shadowColor: '#000',
              backgroundColor: 'white',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: Platform.OS === 'android' ? 13 : null,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}>
            {countrySelector.map(el => (
              <TouchableOpacity
                key={el.code}
                style={{
                  // marginBottom: 5,
                  padding: 3,
                }}
                onPress={() => {
                  i18n.changeLanguage(el.value),
                    setShowOptionChangeLanguage(false),
                    setLanguage(el.code),
                    setFlag(el.flag);
                }}>
                <View
                  style={{
                    height: 15,
                    // flex: 1,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1.75,
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                      }}>
                      {el.flag}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 3.25,
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    }}>
                    <Text
                      style={{
                        fontSize: 7,
                      }}>
                      {el.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    }}>
                    <Icon
                      name={'check'}
                      size={10}
                      color={
                        el.flag === flag ? Colors.neutral[300] : Colors.white
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </Pressable>
    </HeaderWrapper>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    color: 'blue',
  },
});
export default HeaderBrand;
