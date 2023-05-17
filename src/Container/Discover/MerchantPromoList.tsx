import React from 'react';
import {View} from 'react-native';
import {Content} from '@Organism/Basic';
import {HeaderTitle} from '@Molecule/index';
import PromoCard from './PromoCard';
import {navigate} from '@Navigators/utils';
import useTheme from '@Hooks/useTheme';
import {useTranslation} from 'react-i18next';

const dataDummy = [
  {
    id: 1,
    title: 'Voucher Flash Sale 50% OFF',
    description: 'Exchange your voucher at the nearest outlet',
    expiredAt: '30 minutes again',
    imgUrl:
      'https://drive.google.com/uc?export=view&id=1X8wRkRGYV6efNnWTLHiewxYL5CLRemth',
  },
  {
    id: 2,
    title: 'Voucher Flash Sale 50% OFF',
    description: 'Exchange your voucher at the nearest outlet',
    expiredAt: '30 minutes again',
    imgUrl:
      'https://drive.google.com/uc?export=view&id=1gZMSSVEqdHOtBC9Cp42M8TBe3-tkXVUv',
  },
  {
    id: 3,
    title: 'Voucher Flash Sale 50% OFF',
    description: 'Exchange your voucher at the nearest outlet',
    expiredAt: '30 minutes again',
    imgUrl:
      'https://drive.google.com/uc?export=view&id=1bE9NopPU5Ad4-wiqTUf0-FxHu_BDaEms',
  },
];

const MerchantPromoList = (props: any) => {
  const {navigation, route} = props;
  const {promoList} = route.params;
  const {Gutters} = useTheme();
  const {t} = useTranslation();

  return (
    <>
      <HeaderTitle title="Merchant Promo" showAvatarProfile />

      <Content contentContainerStyle={{...Gutters.smallPadding}}>
        <View>
          {dataDummy.map(item => {
            return (
              <PromoCard
                voucherName={t(item.title)}
                voucherDescription={t(item.description)}
                voucherImage={item.imgUrl}
                voucherTime={t(item.expiredAt)}
                onPress={() =>
                  navigate('MerchantPromoDetail', {promoDetail: item})
                }
              />
            );
          })}
        </View>
      </Content>
    </>
  );
};

export default MerchantPromoList;
