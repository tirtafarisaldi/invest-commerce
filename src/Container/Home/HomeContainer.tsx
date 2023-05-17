import React, {useEffect, useState} from 'react';
import Text from '@Atom/Text';
import {View} from 'react-native';
import {Container, Content} from '@Organism/Basic';
import {Route, TabView} from 'react-native-tab-view';
import {Social} from '@Container/Social';
import {Connect} from '@Container/Connect';
import {Discover} from '@Container/Discover';
import {Play} from '@Container/Play';
import TabBar from './Components/TabBar';
import {RootState} from 'src/Redux/Reducers';
import {getTierUser} from '@Actions/earn';
import {ConnectedProps, connect} from 'react-redux';
import {fetchMyProfile} from '@Actions/user';
import HeaderDiscover from '@Container/Discover/Components/HeaderDiscover';

interface IHome {}

const HomeContainer = (props: IHome & ReduxProps) => {
  const [index, setIndex] = useState<number>(2);
  const [routes] = useState([
    {key: 'social', title: 'Social'},
    {key: 'connect', title: 'Connect'},
    {key: 'discover', title: 'Discover'},
    {key: 'play', title: 'Play'},
  ]);

  const _renderScene = ({route}: {route: Route}) => {
    switch (route.key) {
      case 'social':
        return <Social />;
      case 'connect':
        return <Connect />;
      case 'discover':
        return <Discover />;
      case 'play':
        return <Play />;
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container>
      <HeaderDiscover hasNotification />
      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={_renderScene}
        renderTabBar={() => null}
      />
      <TabBar indexActive={index} setIndexActive={setIndex} />
    </Container>
  );
};

const mapStateToProps = ({user, earn}: RootState) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(HomeContainer);
