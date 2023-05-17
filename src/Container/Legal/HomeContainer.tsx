import React from 'react';
import Text from '@Atom/Text';
import {Container, Content} from '@Organism/Basic';
import {HeaderTitle} from '@Molecule/Header';
import {Button} from '@Atom/Button';
import {navigate} from '@Navigators/utils';

const HomeContainer = () => {
  return (
    <Container>
      <Content contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
        <HeaderTitle title="Home" />

        <Text
          style={{
            textAlign: 'center',
            marginTop: '20%',
          }}>
          Just for test, pls move later
        </Text>
        <Button
          type="primary"
          title="To discover screen"
          titleStyle={[{color: 'white'}]}
          onPress={() => navigate('DiscoverScreen')}
        />
      </Content>
    </Container>
  );
};

export default HomeContainer;
