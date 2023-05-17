import {Icon, Text} from '@Atom/index';
import useTheme from '@Hooks/useTheme';
import {navigate} from '@Navigators/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';

export default function Search() {
  const {t} = useTranslation();
  const {Gutters, Layout, Colors} = useTheme();

  const [searchList, setSearchList] = useState([]);

  const getSearchList = async () => {
    try {
      const searchList = await AsyncStorage.getItem('searchList');
      if (searchList !== null) {
        return JSON.parse(searchList);
      } else {
        return null;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    getSearchList().then(res => {
      if (res !== null) {
        setSearchList(res.slice(0, 8));
      } else {
        setSearchList([]);
      }
    });
  }, [searchList]);

  const renderSearchHistory = () => {
    return searchList?.map((el: any, i: number) => {
      return (
        <TouchableOpacity
          key={i}
          style={[
            Gutters.tinyRMargin,
            Gutters.smallTMargin,
            Gutters.smallHPadding,
            {
              backgroundColor: Colors.neutral[200],
              paddingVertical: 2,
              borderRadius: 20,
            },
          ]}>
          <Text size="xs" color={Colors.primary[600]}>
            {el}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const removeSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchList');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={[Gutters.smallHPadding, Gutters.tinyTMargin]}>
      <TouchableOpacity
        onPress={() => navigate('SearchScreen')}
        style={[
          Layout.rowHCenter,
          {
            borderWidth: 1,
            padding: 10,
            borderRadius: 12,
            borderColor: Colors.neutral[300],
          },
        ]}>
        <Icon name="search" size="xl" />
        <View style={Gutters.smallLMargin}>
          <Text color={Colors.neutral[300]}>{t('discoverScreen.search')}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={[
          Gutters.smallTMargin,
          Layout.rowHCenter,
          Layout.scrollSpaceBetween,
        ]}>
        <Text variant="semibold">{t('discoverScreen.recentSearch')}</Text>
        <TouchableOpacity onPress={removeSearchHistory}>
          <Text size="xs" color={Colors.info[600]}>
            {t('discoverScreen.clearHistory')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[Layout.rowHCenter, {flexWrap: 'wrap'}]}>
        {renderSearchHistory()}
      </View>
    </View>
  );
}
