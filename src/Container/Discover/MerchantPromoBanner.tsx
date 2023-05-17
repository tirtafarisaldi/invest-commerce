import React, {useState, useMemo, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import {width} from '@Theme/Layout';
import Carousel from 'react-native-snap-carousel';
import {navigate} from '@Navigators/utils';
import CarouselItem from './CarouselItem';
import {Content} from '@Organism/Basic';
import {useTranslation} from 'react-i18next';

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

const MerchantPromoBanner = (props: any) => {
  const {Colors, Gutters} = useTheme();
  const {t} = useTranslation();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(1);

  const RenderPromoCarousel = () => {
    const renderCarouselItem = ({item}: {item: any}) => {
      return (
        <CarouselItem
          imgUrl={item.imgUrl}
          key={item.id}
          onPress={() => navigate('MerchantPromoDetail', {promoDetail: item})}
        />
      );
    };
    return (
      <>
        <Carousel
          ref={(ref: any) => (carouselRef.current = ref)}
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
    <Content
      contentContainerStyle={{
        ...Gutters.smallVPadding,
        backgroundColor: Colors.neutral[100],
      }}>
      <View style={styles.titleContainer}>
        <Text
          variant="bold"
          size="lg"
          style={{...Gutters.smallLPadding}}
          text="Merchant Promo"
        />

        <TouchableOpacity
          onPress={() =>
            navigate('MerchantPromoList', {promoList: props.data})
          }>
          <Text
            color={Colors.primary[600]}
            style={{...Gutters.smallRPadding}}
            text={t('discoverScreen.seeAll')}
          />
        </TouchableOpacity>
      </View>
      <Text
        size="base"
        variant="light"
        color={Colors.neutral[400]}
        style={{...Gutters.smallLPadding}}
        text={t('discoverScreen.merchantBannerText')}
      />

      {RenderPromoCarousel()}
      {RenderPagination}
    </Content>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCarouselDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  centerRowCenter: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default MerchantPromoBanner;
