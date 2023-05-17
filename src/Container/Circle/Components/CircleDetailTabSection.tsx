/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {Button} from '@Atom/Button';
import Separator from '@Atom/Separator';
import {Colors} from '@Theme/Variables';
import useTheme from '@Hooks/useTheme';
import CirclePostCardView from './CirclePostCardView';
import RecommendedSectionView from './RecommendedSectionView';
import MemberListSectionView from './MemberListSectionView';
import AboutSectionView from './AboutSectionView';

const tabList = ['Post', 'Recommended', 'Members', 'About'];

const CircleDetailTabSection = () => {
  const {Layout} = useTheme();

  const [activeTab, setActiveTab] = React.useState('Post');

  const changeTabCallback = React.useCallback((tabName: string) => {
    setActiveTab(tabName);
  }, []);

  let renderer;

  switch (activeTab) {
    case 'Post':
      renderer = <CirclePostCardView />;
      break;
    case 'Recommended':
      renderer = <RecommendedSectionView />;
      break;
    case 'Members':
      renderer = <MemberListSectionView />;
      break;
    case 'About':
      renderer = <AboutSectionView />;
  }

  return (
    <>
      <View
        style={[
          Layout.fullWidth,
          {
            backgroundColor: 'white',
            paddingBottom: 18,
            flexDirection: 'row',
          },
        ]}>
        <ScrollView horizontal>
          {tabList.map(tab => (
            <View key={tab}>
              <Button
                title={tab}
                colors={Colors.transparent}
                titleStyle={{
                  color: activeTab === tab ? Colors.primary[600] : Colors.black,
                  fontSize: 14,
                }}
                style={{
                  justifyContent: 'center',
                }}
                onPress={() => changeTabCallback(tab)}
              />
              <Separator
                variant="horizontal"
                color={activeTab === tab ? Colors.primary[600] : undefined}
                size={{
                  height: 2,
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      {renderer}
    </>
  );
};

export default React.memo(CircleDetailTabSection);
