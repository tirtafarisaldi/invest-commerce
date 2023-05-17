import {Button} from '@Atom/Button';
import Text from '@Atom/Text';
import {HeaderBrand} from '@Molecule/Header';
import {Container, Content} from '@Organism/Basic';
import React, {useState, useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {navigate} from '@Navigators/utils';
import useTheme from '@Hooks/useTheme';
import {View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width} from '@Theme/Layout';
import PageMarker from '@Container/Auth/Components/PageMarker';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OnboardingScreen = () => {
  const {t} = useTranslation();
  const {Colors, Common, Fonts, Gutters, Layout, Images} = useTheme();

  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const totalPages = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % totalPages;
      scrollViewRef.current?.scrollTo({
        animated: true,
        x: nextPage * width,
      });
      setCurrentPage(nextPage);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const handleScroll = (event: {nativeEvent: {contentOffset: {x: number}}}) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  const dataSwipeOnBoarding = [
    {
      image: Images.onboardingScreen.onboardingOne,
      title: t('onboardingScreen.titleOne'),
      text: t('onboardingScreen.textOne'),
    },
    {
      image: Images.onboardingScreen.onboardingTwo,
      title: t('onboardingScreen.titleTwo'),
      text: t('onboardingScreen.textTwo'),
    },
    {
      image: Images.onboardingScreen.onboardingThree,
      title: t('onboardingScreen.titleThree'),
      text: t('onboardingScreen.textThree'),
    },
    {
      image: Images.onboardingScreen.onboardingFour,
      title: t('onboardingScreen.titleFour'),
      text: t('onboardingScreen.textFour'),
    },
  ];

  return (
    <Container
      style={[
        Common.backgroundLayout,
        Layout.colVCenter,
        {
          backgroundColor: 'white',
        },
      ]}>
      <HeaderBrand />
      <Content>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={500}>
          {dataSwipeOnBoarding.map(el => (
            <View
              key={el.title}
              style={{
                width: width,
                marginBottom: '3%',
              }}>
              <FastImage
                source={el.image}
                resizeMode={FastImage.resizeMode.contain}
                style={[
                  {
                    width: width / 1.5,
                    height: width / 1.5,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '10%',
                    marginTop: '5%',
                  },
                ]}
              />
              <Text
                variant="semibold"
                size="sm"
                style={[Fonts.textCenter, {marginBottom: '2%'}]}>
                {el.title}
              </Text>
              <Text
                variant="light"
                size="sm"
                style={[
                  Fonts.textCenter,
                  {paddingLeft: '3%', paddingRight: '3%'},
                ]}>
                {el.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.pageMarkersContainer, {marginBottom: '5%'}]}>
          <PageMarker isActive={currentPage === 0} />
          <PageMarker isActive={currentPage === 1} />
          <PageMarker isActive={currentPage === 2} />
          <PageMarker isActive={currentPage === 3} />
        </View>

        <Button
          type="primary"
          title={t('onboardingScreen.buttonGuest')}
          titleStyle={[{color: 'white'}]}
          onPress={() => navigate('HomeScreen')}
          style={[
            Gutters.smallVPadding,
            Gutters.regularHMargin,
            {backgroundColor: '#7555DA'},
          ]}
        />

        <View>
          <TouchableOpacity onPress={() => navigate('LegalScreen')}>
            <Text
              variant="normal"
              size="xs"
              style={[
                Fonts.textCenter,
                {paddingLeft: '3%', paddingRight: '3%', marginTop: '3%'},
              ]}>
              {t('onboardingScreen.agreeingTNC')}{' '}
              <Text
                variant="semibold"
                size="xs"
                style={[
                  Fonts.textCenter,
                  {
                    paddingLeft: '3%',
                    paddingRight: '3%',
                    marginTop: '3%',
                    color: '#3AC4A0',
                  },
                ]}>
                {t('onboardingScreen.tnc')}{' '}
              </Text>
              Seeds
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            Layout.rowHCenter,
            // Gutters.smallTMargin,
            Gutters.regularHMargin,
            {marginTop: '15%'},
          ]}>
          <Button
            type="outline"
            title={t('onboardingScreen.buttonLogin')}
            titleStyle={[{color: Colors.primary[600]}]}
            onPress={() => navigate('LoginScreen')}
            style={[Gutters.smallVPadding]}
          />

          <Button
            title={t('onboardingScreen.buttonRegister')}
            titleStyle={{color: Colors.white}}
            onPress={() => navigate('RegisterScreen')}
            style={[Gutters.smallVPadding]}
          />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  pageMarkersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default OnboardingScreen;
