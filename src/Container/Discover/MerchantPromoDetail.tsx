import React, {useEffect, useMemo, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '@Atom/Text';
import {HeaderTitle} from '@Molecule/index';
import {Content} from '@Organism/Basic';
import {width} from '@Theme/Layout';
import useTheme from '@Hooks/useTheme';
import Icon from '@Atom/Icon';
import RenderHTML from 'react-native-render-html';
import {Button} from '@Atom/Button';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from './CarouselItem';
import {useTranslation} from 'react-i18next';
import {getMerchantPromoDetail} from '@Actions/discover';
import {RootState} from 'src/Redux/Reducers';
import {connect, ConnectedProps} from 'react-redux';

const dataDummy = [
  {
    id: 1,
    imgUrl:
      'https://drive.google.com/uc?export=view&id=1X8wRkRGYV6efNnWTLHiewxYL5CLRemth',
  },
  {
    id: 2,
    imgUrl:
      'https://drive.google.com/uc?export=view&id=1gZMSSVEqdHOtBC9Cp42M8TBe3-tkXVUv',
  },
  {
    id: 3,
    imgUrl:
      'https://drive.google.com/uc?export=view&id=1bE9NopPU5Ad4-wiqTUf0-FxHu_BDaEms',
  },
];

type Props = ReduxProps;

const MerchantPromoDetail: React.FC<Props> = props => {
  const {navigation, route, _getMerchantPromoDetail} = props;
  const {promoDetail} = route.params;
  const {Colors, Fonts, Gutters} = useTheme();
  const {t} = useTranslation();

  const tncList = t('merchantPromoDetail.tncList', {
    returnObjects: true,
  }) as string[];

  const source = {
    html: `
  <ol>
    ${tncList.map((tnc: string) => `<li>${tnc}</li>`).join('')}
  </ol>
  `,
  };

  const [activeSlide, setActiveSlide] = useState(1);
  const [data, setData] = useState<any>('');

  const getMerchantPromoDetailData = async () => {
    //TODO HANDLE ID
    const getData: any = await _getMerchantPromoDetail(17676056.515091702);
    setData(getData);
  };

  useEffect(() => {
    getMerchantPromoDetailData();
  }, []);

  const RenderOtherPromoCarousel = () => {
    const renderCarouselItem = ({item}: {item: any}) => {
      return <CarouselItem imgUrl={item.imgUrl} key={item.id} />;
    };
    return (
      <>
        <Carousel
          enableMomentum={false}
          decelerationRate={0.1}
          activeSlideOffset={1}
          scrollEndDragDebounceValue={0.1}
          removeClippedSubviews={false}
          animationFunc={'timing'}
          animationOptions={{
            friction: 4,
            tension: 40,
            isInteraction: false,
            useNativeDriver: true,
          }}
          data={dataDummy}
          enableSnap={true}
          loop={false}
          loopClonesPerSide={dataDummy.length}
          autoplay={true}
          autoplayInterval={3000}
          hasParallaxImages={false}
          renderItem={renderCarouselItem}
          sliderWidth={width}
          itemWidth={width - 45}
          contentContainerCustomStyle={{
            ...Gutters.largeLMargin,
            ...Gutters.smallVMargin,
          }}
          onSnapToItem={(index: number) => setActiveSlide(index)}
          activeSlideAlignment={'start'}
        />
      </>
    );
  };

  const RenderPagination = useMemo(() => {
    if (dataDummy.length) {
      return (
        <View style={styles.centerRowCenter}>
          {dataDummy?.map((_, idx) => {
            return (
              <View
                key={idx}
                style={[
                  styles.itemCarouselDot,
                  {
                    backgroundColor:
                      idx === activeSlide
                        ? Colors.primary[600]
                        : Colors.neutral[300],
                    ...Gutters.smallBMargin,
                  },
                ]}
              />
            );
          })}
        </View>
      );
    }
  }, [dataDummy, activeSlide]);

  return (
    <>
      <HeaderTitle title="Merchant Promo" showAvatarProfile />
      <Content contentContainerStyle={{...Gutters.smallVPadding}}>
        <View>
          <View
            style={{
              backgroundColor: Colors.neutral[100],
              ...Gutters.smallVPadding,
            }}>
            <View style={[Gutters.smallHPadding]}>
              <Image
                source={{uri: promoDetail.imgUrl}}
                style={[styles.imagePromo, {...Gutters.tinyTMargin}]}
              />
            </View>
            <View style={[styles.titleContainer, {...Gutters.smallHMargin}]}>
              <Text size="lg" variant="bold" text="Merchant Promo" />
              <Text
                color={Colors.neutral[300]}
                text={t('merchantPromoDetail.validDate')}
              />
            </View>
            <View
              style={[
                styles.timerContainer,
                {backgroundColor: Colors.offWhite, ...Gutters.regularHMargin},
              ]}>
              <Icon name="clock-3" color={Colors.primary[600]} size={30} />
              <Text
                size="lg"
                color={Colors.warning[500]}
                style={styles.timerText}
                text="00 : 29 : 30"
              />
            </View>
            <View style={{...Gutters.smallHPadding}}>
              <Text size="lg" variant="bold" text={t('tncScreen.tnc')} />

              <RenderHTML contentWidth={width} source={source} />
              <Button
                type="primary"
                title={t('merchantPromoDetail.claimButton')}
                titleStyle={{
                  color: Colors.white,
                  ...Fonts.semibold,
                }}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: Colors.neutral[100],
              ...Gutters.smallTMargin,
            }}>
            <Text
              size="lg"
              variant="bold"
              style={{...Gutters.smallLPadding, ...Gutters.regularTMargin}}
              text={t('merchantPromoDetail.other')}
            />

            <Text
              color={Colors.neutral[400]}
              style={{...Gutters.smallLPadding}}
              text={t('merchantPromoDetail.otherSubtitle')}
            />
            {RenderOtherPromoCarousel()}
            {RenderPagination}
          </View>
        </View>
      </Content>
    </>
  );
};

const styles = StyleSheet.create({
  imagePromo: {
    alignSelf: 'center',
    width: '100%',
    height: width * 0.4,
    borderRadius: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: width * 0.03,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: width * 0.04,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: width * 0.05,
  },
  timerText: {
    marginLeft: width * 0.1,
  },
  carouselProducts: {
    flexGrow: 0,
    paddingVertical: 0,
  },
  centerRowCenter: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCarouselDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

const mapStateToProps = ({discover}: RootState) => ({});
const mapDispatchToProps = {
  _getMerchantPromoDetail: getMerchantPromoDetail,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(MerchantPromoDetail);
