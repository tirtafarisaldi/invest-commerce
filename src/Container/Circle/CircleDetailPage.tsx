/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useSelector} from 'react-redux';
import {
  CircleDetaiCreatePost,
  CircleDetailHeading,
  CircleDetailTabSection,
} from './Components';
import {Button} from '@Atom/Button';
import HeaderTitle from '@Molecule/Header/HeaderTitle';
import {Container, Content} from '@Organism/Basic';
import {Colors} from '@Theme/Variables';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {RootState} from 'src/Redux/Reducers';

const CircleDetailPage = () => {
  const navigation = useNavigation();
  const showFloatingCreatePost = useSelector(
    ({circle}: RootState) => circle.showFloatingCreatePost,
  );
  return (
    <Container>
      <HeaderTitle title="Circle" showAvatarProfile />
      <Content>
        <CircleDetailHeading />
        <CircleDetaiCreatePost />
        <CircleDetailTabSection />
      </Content>
      {showFloatingCreatePost ? (
        <Button
          type="iconOnly"
          icon="edit"
          iconColor="white"
          iconSize={'xl2'}
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            width: 65,
            height: 65,
            borderRadius: 50,
            backgroundColor: Colors.primary[600],
          }}
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: 'CreateCircle',
              }),
            )
          }
          noBorder
        />
      ) : null}
    </Container>
  );
};

export default CircleDetailPage;
