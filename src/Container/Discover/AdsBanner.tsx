import React, {useRef} from 'react';
import useTheme from '@Hooks/useTheme';
import {width} from '@Theme/Layout';
import Carousel from 'react-native-snap-carousel';
import {navigate} from '@Navigators/utils';
import CarouselItem from './CarouselItem';
import {Content} from '@Organism/Basic';

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

const AdsBanner = (props: any) => {
  const {Colors, Gutters} = useTheme();
  const carouselRef = useRef(null);

  const RenderAdsBannerCarousel = () => {
    const renderCarouselItem = ({item}: {item: any}) => {
      return (
        <CarouselItem
          imgUrl={item.imgUrl}
          key={item.id}
          onPress={() => navigate('AdsBannerDetail', {adsDetail: item})}
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
          activeSlideAlignment={'start'}
        />
      </>
    );
  };

  return (
    <Content
      contentContainerStyle={{
        ...Gutters.smallVPadding,
        backgroundColor: Colors.neutral[100],
      }}>
      {RenderAdsBannerCarousel()}
    </Content>
  );
};

export default AdsBanner;
