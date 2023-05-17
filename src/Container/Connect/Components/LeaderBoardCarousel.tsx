import * as React from 'react';
import Carousel from 'react-native-snap-carousel';

import {navigate} from '@Navigators/utils';
import {width} from '@Theme/Layout';
import useTheme from '@Hooks/useTheme';
import CircleCard from './CircleCard';
import {StyleSheet, View} from 'react-native';

export type CardDataType = {
  id: string;
  name: string;
  imageCover: string;
  totalRating: string;
  totalMember: number;
  totalPost: number;
  isPremium: boolean;
};

type Props = {
  data: Array<CardDataType>;
};

const LeaderBoardCarousel = ({data}: Props) => {
  const [activeSlide, setActiveSlide] = React.useState(1);
  const carouselRef = React.useRef(null);
  const {Colors, Gutters} = useTheme();

  const handleCardPressed = React.useCallback(() => {
    navigate('CircleDetails');
  }, []);

  const renderCarouselItem = React.useCallback(
    ({item, index}: {item: CardDataType; index: number}) => {
      return (
        <CircleCard
          key={index}
          circleName={item.name}
          imageUri={item.imageCover}
          trending={item.totalRating}
          members={item.totalMember}
          posts={item.totalPost}
          isPremium={item.isPremium}
          onPress={handleCardPressed}
        />
      );
    },
    [handleCardPressed],
  );

  const handleItemSnapped = React.useCallback(
    (index: number) => setActiveSlide(index),
    [],
  );

  const CarouselIndicators = React.useMemo(() => {
    if (data.length) {
      return (
        <View style={styles.centerRowCenter}>
          {data?.map((_, idx) => {
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
  }, [data, Colors, activeSlide]);

  return (
    <>
      <Carousel
        ref={(ref: any) => (carouselRef.current = ref)}
        enableMomentum={false}
        decelerationRate={0.1}
        activeSlideOffset={1}
        scrollEndDragDebounceValue={0.1}
        activeAnimationType={'timing'}
        data={data}
        enableSnap={true}
        loop={false}
        loopClonesPerSide={data.length}
        autoplay={true}
        autoplayInterval={3000}
        hasParallaxImages={false}
        sliderWidth={width}
        itemWidth={width - 45}
        activeSlideAlignment={'start'}
        renderItem={renderCarouselItem}
        onSnapToItem={handleItemSnapped}
        contentContainerCustomStyle={{
          ...Gutters.smallVMargin,
        }}
      />
      {CarouselIndicators}
    </>
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

export default LeaderBoardCarousel;
