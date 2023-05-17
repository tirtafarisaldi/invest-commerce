import React, {useEffect, useMemo, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '@Atom/Text';
import {HeaderTitle} from '@Molecule/index';
import {Content} from '@Organism/Basic';
import {width} from '@Theme/Layout';
import useTheme from '@Hooks/useTheme';
import {Button} from '@Atom/Button';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from './CarouselItem';
import {useTranslation} from 'react-i18next';
import {getAdsDetail} from '@Actions/discover';
import {RootState} from 'src/Redux/Reducers';
import {connect, ConnectedProps} from 'react-redux';

const dataDummy = [
  {
    id: 1,
    imgUrl:
      'https://drive.google.com/uc?export=view&id=1100yXdOudIvcrv2c_mwqOaD6qsaAEnbT',
  },
  {
    id: 2,
    imgUrl:
      'https://drive.google.com/uc?export=view&id=1C2QyK4WmCNxbdxX7hJLZon7eqFu085Ed',
  },
  {
    id: 3,
    imgUrl:
      'https://drive.google.com/uc?export=view&id=10V5HnYI_5LSjj-04nhnsiXqPCs5rOT8v',
  },
];

type Props = ReduxProps;

const AdsBannerDetail: React.FC<Props> = props => {
  const {navigation, route, _getAdsDetail} = props;
  const {adsDetail} = route.params;
  const {Colors, Fonts, Gutters} = useTheme();
  const {t} = useTranslation();

  const [activeSlide, setActiveSlide] = useState(1);
  const [data, setData] = useState<any>('');

  const getAdsDetailData = async () => {
    //TODO HANDLE ID
    const getData: any = await _getAdsDetail(12977625.256492063);
    setData(getData);
  };

  useEffect(() => {
    getAdsDetailData();
  }, []);

  const RenderOtherAdsBannerCarousel = () => {
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
          animationfunc={'timing'}
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
          {dataDummy?.map((i, idx) => {
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
  }, [data, activeSlide]);

  return (
    <>
      <HeaderTitle title="Ads Banner" showAvatarProfile />
      <Content contentContainerStyle={{...Gutters.smallVPadding}}>
        <View>
          <View
            style={{
              backgroundColor: Colors.neutral[100],
              ...Gutters.smallVPadding,
            }}>
            <View style={[Gutters.smallHPadding]}>
              <Image
                source={{uri: adsDetail.imgUrl}}
                style={[styles.imagePromo, {...Gutters.tinyTMargin}]}
                resizeMode="cover"
              />
            </View>
            <View style={[styles.titleContainer, {...Gutters.smallHMargin}]}>
              <Text size="lg" variant="bold" text="Flash Sale Up To 75%" />
              <Text
                color={Colors.neutral[300]}
                text={t('adsBannerDetail.validDate')}
                size="sm"
              />
            </View>
            <Text
              size="base"
              color={Colors.neutral[400]}
              style={{...Gutters.smallHPadding}}
              text={t('adsBannerDetail.description')}
            />

            <View style={{...Gutters.smallHPadding}}>
              <Button
                type="primary"
                title={t('adsBannerDetail.continueButton')}
                titleStyle={{color: Colors.white, ...Fonts.semibold}}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: Colors.neutral[100],
              ...Gutters.smallTMargin,
              ...Gutters.xlargeBPadding,
            }}>
            <Text
              size="lg"
              variant="bold"
              style={{...Gutters.smallLPadding, ...Gutters.regularTMargin}}
              text={t('adsBannerDetail.other')}
            />
            {RenderOtherAdsBannerCarousel()}
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
  _getAdsDetail: getAdsDetail,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(AdsBannerDetail);
