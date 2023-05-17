import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '@Atom/Text';
import {width} from '@Theme/Layout';
import Icon from '@Atom/Icon';
import useTheme from '@Hooks/useTheme';

const PromoCard = (props: any) => {
  const {voucherName, voucherImage, voucherDescription, voucherTime, onPress} =
    props;
  const {Colors, MetricsSizes} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cardContainer, {borderRadius: MetricsSizes.large}]}>
      <View
        style={{
          backgroundColor: Colors.neutral[100],
          borderRadius: MetricsSizes.large,
        }}>
        <Image
          source={{uri: voucherImage}}
          style={[
            styles.cardImage,
            {
              borderTopLeftRadius: MetricsSizes.large,
              borderTopRightRadius: MetricsSizes.large,
            },
          ]}
        />
        <View style={styles.cardText}>
          <Text size="base" variant="bold">
            {voucherName}
          </Text>
          <Text size="sm">{voucherDescription}</Text>
          <View
            style={[
              styles.cardTimeContainer,
              {
                backgroundColor: Colors.primary[600],
                borderRadius: MetricsSizes.large,
              },
            ]}>
            <Icon name="clock" color={Colors.white} size={15} />
            <Text size="sm" color={Colors.white} style={styles.timeText}>
              {voucherTime}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: width * 0.03,
  },
  cardImage: {
    width: '100%',
    height: width * 0.4,
  },
  cardText: {
    paddingLeft: width * 0.05,
    paddingVertical: width * 0.05,
  },
  cardTimeContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: width * 0.03,
    marginTop: width * 0.03,
  },
  timeText: {marginTop: width * 0.007, marginLeft: width * 0.01},
});

export default PromoCard;
